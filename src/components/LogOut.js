import React from 'react';

function LogOut() {
  const handleLogOut = () => {
    console.log('User logged out');
  };

  return (
    <div>
      <h1>Log Out</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default LogOut;
