import "../design/reviews/rating.css"
import { useState } from "react";

const StarsRating = ({handleRate}) => {
    const [rating, setRating] = useState(5); // Initially checked rating

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        handleRate(newRating);
    };

    return (
        <div className="body1">
        <div className="rating-stars">
            <input className="input1" type="radio" name="rating" id="rs0" /><label className="label11" htmlFor="rs0" onClick={() => handleRatingChange(0)}></label>
            <input className="input1" type="radio" name="rating" id="rs1" /><label className="label11" htmlFor="rs1" onClick={() => handleRatingChange(1)}></label>
            <input className="input1" type="radio" name="rating" id="rs2" /><label className="label11" htmlFor="rs2" onClick={() => handleRatingChange(2)}></label>
            <input className="input1" type="radio" name="rating" id="rs3" /><label className="label11" htmlFor="rs3" onClick={() => handleRatingChange(3)}></label>
            <input className="input1" type="radio" name="rating" id="rs4" /><label className="label11" htmlFor="rs4" onClick={() => handleRatingChange(4)}></label>
            <input className="input1" type="radio" name="rating" id="rs5" /><label className="label11" htmlFor="rs5" onClick={() => handleRatingChange(5)}></label>
            <span className="number">{rating}</span>
        </div>
        </div>
    );
}

export default StarsRating;
