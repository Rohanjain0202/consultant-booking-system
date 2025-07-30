  import { useNavigate } from 'react-router-dom';
  import './BrowseServices.css';

  const categories = [
    {
      name: "Fitness",
      description: "Find fitness trainers and health experts for workouts and nutrition.",
      image: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
    },
    {
      name: "Medical",
      description: "Consult licensed doctors and medical professionals online.",
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
    },
    {
      name: "Astrology",
      description: "Talk to astrologers for horoscope, Kundli, and future predictions.",
      image: "https://cdn-icons-png.flaticon.com/512/3176/3176292.png"
    },
    {
      name: "Business",
      description: "Get advice from business consultants for growth and strategy.",
      image: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png"
    },
    {
      name: "Legal",
      description: "Hire lawyers and legal advisors for your legal needs.",
      image: "https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
    },
    {
      name: "Education",
      description: "Tutors and mentors to help with your academic goals.",
      image: "https://cdn-icons-png.flaticon.com/512/201/201623.png"
    },
    {
      name: "Therapy",
      description: "Mental health professionals and therapists to support your wellbeing.",
      image: "https://cdn-icons-png.flaticon.com/512/4727/4727265.png"
    },
    {
      name: "Relationship",
      description: "Get expert relationship and marriage counseling.",
      image: "https://cdn-icons-png.flaticon.com/512/990/990498.png"
    },
    {
      name: "Technology",
      description: "Tech experts for coding, websites, and IT consulting.",
      image: "https://cdn-icons-png.flaticon.com/512/2721/2721236.png"
    },
    {
      name: "Career",
      description: "Career coaches and job consultants for your professional growth.",
      image: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png"
    }
  ];

  const BrowseServices = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
      navigate(`/services/category/${category}`);
    };

    return (
      <div className="browse-container">
        <h2 className="browse-title">Browse by Category</h2>
        <div className="browse-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default BrowseServices;
