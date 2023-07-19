import React from 'react';
import '../../index.css';
import Lottie from 'lottie-react';
import cartAnimationData from '../../designs/lotties/shopping-cart-animation.json';

const CartAnimation = () => {
    return (
        <div className="cart-animation-container">
            <Lottie animationData={cartAnimationData} />
        </div>
    )
}

export default CartAnimation;
