import React, { useState } from 'react';
import style from './StarRating.module.css'
import { postReview } from '@/app/redux/actions/actions';
import { useDispatch } from 'react-redux';

const StarRating = ({ idReview }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch()

    const handleMouseOver = (starIndex) => {
        setHover(starIndex);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleClick = async (starIndex) => {
        setRating(starIndex);
        const reviewData = { rating: starIndex };
        dispatch(postReview(reviewData))
    };

    return (
        <div className={style.starRating}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? style.on : style.off}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
                        <span className={style.star}>★</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
