import { useState, useContext, createContext } from 'react';

export const ReviewContext = createContext();
export const useClimate = () => useContext(ReviewContext);

export default function ReviewProvider({ children }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <>
      <ReviewContext.Provider
        value={{ review, setReview, rating, setRating, hover, setHover }}
      >
        {children}
      </ReviewContext.Provider>
    </>
  );
}
