import React, {useEffect, useState, useContext} from 'react';
import {getUserData} from '../../services/api';
import {UserContext} from '../CTX/UserContext';
import PremiumModal from './Modals/PremiumModal';

// eslint-disable-next-line require-jsdoc
function DashboardSettings({ }) {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isPremiunmModalOpen, setIsPremiunmModalOpen] = useState(false);

  const handlePremiumClick = () => {
    setIsPremiunmModalOpen(true);
  };

  const closePremiumModal = () => {
    setIsPremiunmModalOpen(false);
  };

  const loading = () => {
    return <p>Loading...</p>;
  };

  const settings = () => {
    return (
      <div className="settings-container">
        <h1 className="your-account">Your account</h1>

        <div>
          <p>Current Password</p>
          <div>
            <div className="mock-password">
              {Array(8).fill('•').join('')}
            </div>
            <button className="change-password">Change password</button>
          </div>
        </div>

        <div>
          <h1 className="select-preferences">Select mailing preferences</h1>
          <div className= "mailing-preferences">
            <div className="row">
              <div className="col-6">
                <p>When to mail</p>
                <label>
                  <input type="checkbox" /> Start of sale
                </label>
                <div className="premium-feature"
                  data-tip="This is a premium feature"
                  onClick={handlePremiumClick}
                >
                  <label>
                    <input type="checkbox" disabled /> One day before sale
                  </label>
                </div>

              </div>
              <div className="col-6">
                <div>
                  <p>Reminder</p>
                  <label>
                    <input type="checkbox" /> Once
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" /> Every day of the sale
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isPremiunmModalOpen && <PremiumModal closeModal={closePremiumModal} />}
      </div>
    );
  };


  return currentUser ? (
settings()
  ) : loading();
}

export default DashboardSettings;
