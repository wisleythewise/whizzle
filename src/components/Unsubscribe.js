import React from 'react';

function Unsubscribe() {
  const handleUnsubscribe = () => {
    console.log('User unsubscribed');
  };

  return (
    <div>
      <h1>Unsubscribe</h1>
      <button onClick={handleUnsubscribe}>Unsubscribe</button>
    </div>
  );
}

export default Unsubscribe;
