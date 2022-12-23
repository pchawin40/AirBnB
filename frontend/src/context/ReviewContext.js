import { useState, useContext, createContext } from 'react';

export const ReviewContext = createContext();
export const useReview = () => useContext(ReviewContext);

export default function ReviewProvider({ children }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewAction, setReviewAction] = useState("");
  const [avgReview, setAvgReview] = useState(0);
  const [reviewLoaded, setReviewLoaded] = useState(false);
  const [currentSpotId, setCurrentSpotId] = useState(null);

  return (
    <>
      <ReviewContext.Provider
        value={{
          review, setReview,
          rating, setRating,
          hover, setHover,
          reviewAction, setReviewAction,
          avgReview, setAvgReview,
          reviewLoaded, setReviewLoaded,
          currentSpotId, setCurrentSpotId
        }}
      >
        {children}
      </ReviewContext.Provider>
    </>
  );
}
