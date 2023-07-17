import React from 'react';
import '../../index.css';
import Lottie from 'lottie-react';
import DiscountTagAnimationData from '../../designs/lotties/discount-tag-animation.json';

const DiscountTagAnimation = () => {
    return (
        <div className="lottie-container">
            <Lottie animationData={DiscountTagAnimationData} />
        </div>
    )
}

export default DiscountTagAnimation;
