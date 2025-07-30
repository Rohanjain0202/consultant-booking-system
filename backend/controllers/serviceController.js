import Service from '../models/Service.js';

// ✅ Create a new service — only consultants
export const createService = async (req, res) => {
  try {
    if (req.user.role !== 'consultant') {
      return res.status(403).json({ message: 'Only consultants can create services' });
    }

    const {
      title,
      description,
      experience,
      durationInMinutes,
      price,
      category,
      mode,
      languages,
      audience,
      level,
      tags,
      imageUrl,
      availabilityNote,
      certificationUrl,
      location,
      sessionType,
      isFeatured
    } = req.body;

    const service = new Service({
      title,
      description,
      experience,
      durationInMinutes,
      price,
      category,
      consultant: req.user.id,
      mode,
      languages: Array.isArray(languages) ? languages : languages?.split(',').map(x => x.trim()),
      audience,
      level,
      tags: Array.isArray(tags) ? tags : tags?.split(',').map(x => x.trim()),
      imageUrl,
      availabilityNote,
      certificationUrl,
      location,
      sessionType,
      isFeatured
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error("❌ Error creating service:", err);
    res.status(500).json({ message: "Failed to create service", error: err.message });
  }
};

// ✅ Get services added by logged-in consultant
export const getConsultantServices = async (req, res) => {
  try {
    const services = await Service.find({ consultant: req.user.id });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
};


// ✅ Get a service by ID (for consultant to edit)
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service || service.consultant.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Service not found or unauthorized' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch service', error: err.message });
  }
};

// ✅ Update service by consultant
export const updateService = async (req, res) => {
  try {
    const {
      languages,
      tags,
      ...rest
    } = req.body;

    const payload = {
      ...rest,
      ...(languages && {
        languages: Array.isArray(languages) ? languages : languages.split(',').map(x => x.trim())
      }),
      ...(tags && {
        tags: Array.isArray(tags) ? tags : tags.split(',').map(x => x.trim())
      })
    };

    const updated = await Service.findOneAndUpdate(
      { _id: req.params.id, consultant: req.user.id },
      payload,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Service not found or unauthorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service', error: err.message });
  }
};

// ✅ Delete service by consultant
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      consultant: req.user.id,
    });

    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service', error: err.message });
  }
};

// ✅ Public: Get service by ID
export const getPublicServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('consultant', 'name email');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch service', error: err.message });
  }
};

// ✅ Public: Get all services (optional consultant filter)
export const getAllServices = async (req, res) => {
  try {
    const { consultantId } = req.query;
    const filter = consultantId ? { consultant: consultantId } : {};
    const services = await Service.find(filter).populate('consultant', 'name email');
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
};

// ✅ Public: Get services by category
export const getServicesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const services = await Service.find({
      category: { $regex: new RegExp(category, 'i') }
    }).populate('consultant', 'name email');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services by category', error: err.message });
  }
};

// ✅ Public: Get all unique categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
};
