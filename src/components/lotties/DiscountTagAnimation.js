import React from 'react';
import '../../index.css';
import Lottie from 'lottie-react';
import DiscountTagAnimationData from '../../designs/lotties/discount-tag-animation.json';

const DiscountTagAnimation = () => {
    return (
            <Lottie animationData={DiscountTagAnimationData} className='discounttag-animation-container'/>
        )
}

export default DiscountTagAnimation;
