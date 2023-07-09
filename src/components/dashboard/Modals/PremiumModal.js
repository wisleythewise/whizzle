import React from 'react';
import { useNavigate } from "react-router-dom";

const PremiumModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate("/")
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Premium Feature</h2>
        <p>This is a premium feature. Please upgrade to access this feature.</p>
        <button className='change-password' onClick={handleUpgrade}>Upgrade</button>
      </div>
    </div>
  );
};

export default PremiumModal;
