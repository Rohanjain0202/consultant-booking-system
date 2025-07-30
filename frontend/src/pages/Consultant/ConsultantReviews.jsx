 // frontend/pages/Consultant/ConsultantReviews.jsx

// import React, { useEffect, useState } from 'react';
// import api from '../../utils/auth'; // ✅ fixed
// import './ConsultantReviews.css';

// const ConsultantReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [avgRating, setAvgRating] = useState(0);
//   const [loading, setLoading] = useState(true); // ✅ added loading state

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await api.get("/reviews/my"); // ✅ uses api instance
//         setReviews(res.data.reviews);
//         setAvgRating(res.data.averageRating);
//       } catch (err) {
//         console.error("Error fetching reviews:", err);
//       } finally {
//         setLoading(false); // ✅ now works
//       }
//     };

//     fetchReviews();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="consultant-reviews">
//       <h2>My Reviews</h2>
//       <p><strong>Average Rating:</strong> {Number(avgRating).toFixed(1)}</p>

//       {reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         <div className="reviews-list">
//           {reviews.map((review) => (
//             <div key={review._id} className="review-card">
//               <p><strong>Customer:</strong> {review.customer?.name || 'N/A'}</p>
//               <p><strong>Rating:</strong> {review.rating}</p>
//               <p><strong>Comment:</strong> {review.comment}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConsultantReviews;

// frontend/pages/Consultant/ConsultantReviews.jsx

import React, { useEffect, useState } from 'react';
import api from '../../utils/auth';
import './ConsultantReviews.css';

const ConsultantReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews/my");
        setReviews(res.data.reviews);
        setAvgRating(res.data.averageRating);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p className="loading-text">Loading reviews...</p>;

  return (
    <div className="consultant-reviews">
      <h2>My Reviews</h2>
      <p className="average-rating"><strong>Average Rating:</strong> {Number(avgRating).toFixed(1)} ⭐</p>

      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <p><strong>Customer:</strong> {review.customer?.name || 'N/A'}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantReviews;
