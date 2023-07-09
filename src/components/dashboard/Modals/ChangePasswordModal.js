import React from 'react';

const PremiumModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Premium Feature</h2>
        <p>This is a premium feature. Please upgrade to access this feature.</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default PremiumModal;
