import React from 'react';
import '../../index.css';
import Lottie from 'lottie-react';
import tapAnimationData from '../../designs/lotties/tap-animation.json';

const TapAnimation = () => {
    return (
        <div className="lottie-container">
            <Lottie animationData={tapAnimationData} />
        </div>
    )
}

export default TapAnimation;
