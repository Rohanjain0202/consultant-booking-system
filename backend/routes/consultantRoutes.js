import express from 'express';
import { getAllConsultants, getConsultantById } from '../controllers/consultantController.js';
import Service from '../models/Service.js';

const router = express.Router();

// ✅ Always place specific routes above dynamic ones
router.get('/by-service/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    console.log("🔍 Requested serviceId:", serviceId);

    const service = await Service.findById(serviceId).populate('consultant', 'name email role');
    console.log("👉 Populated service:", service);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (!service.consultant) {
      return res.status(404).json({ message: "Service has no consultant assigned" });
    }

    if (service.consultant.role !== 'consultant') {
      return res.status(404).json({ message: "User is not a consultant" });
    }

    const consultant = {
      consultantId: service.consultant._id,
      name: service.consultant.name,
      email: service.consultant.email,
      title: service.title,
      description: service.description,
      duration: service.durationInMinutes,
      price: service.price,
      experience: service.experience,
    };

    res.status(200).json([consultant]);
  } catch (error) {
    console.error("❌ Error fetching consultant by service:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ General routes
router.get('/', getAllConsultants);
router.get('/:id', getConsultantById);

export default router;
