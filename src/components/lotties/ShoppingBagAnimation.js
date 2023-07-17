import React from 'react';
import '../../index.css';
import Lottie from 'lottie-react';
import shoppingBagAnimationData from '../../designs/lotties/shopping-bag-animation.json';

const shoppingBagAnimation = () => {
    return (
        <div className="lottie-container">
            <Lottie animationData={shoppingBagAnimationData} />
        </div>
    )
}

export default shoppingBagAnimation;
