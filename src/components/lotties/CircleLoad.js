import React from 'react';
import '../../index.css';
import Lottie from 'lottie-react';
import CircleLoadData from '../../designs/lotties/loading-animation.json';

const CircleLoad = () => {
    return (
        <div className="lottie-container">
            <Lottie animationData={CircleLoadData} />
        </div>
    )
}

export default CircleLoad;