import './StarSystem.css';

//? StarSystem component
const StarSystem = ({ rating, hover, setRating, setHover }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on star-button" : "off star-button"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star-span">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

// export component
export default StarSystem;
