import React, {useEffect, useState, useContext} from 'react';
import {getUserData} from '../../services/api';
import {UserContext} from '../CTX/UserContext';

// Modals
import PremiumModal from './Modals/PremiumModal';
import ChangePasswordModal from './Modals/ChangePasswordModal';
import DeleteAccountModal from './Modals/DeleteAccountModal';



// Importing the crown 
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line require-jsdoc
function DashboardSettings({ }) {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [isPremiunmModalOpen, setIsPremiunmModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteAccountModal, setIsDeleteAccountModal] = useState(false);

  // Modal handlers
  const handlePremiumClick = () => {
    setIsPremiunmModalOpen(true);
  };

  const closePremiumModal = () => {
    setIsPremiunmModalOpen(false);
  };


  const handleChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleDeleteAccountModal = () => {
    setIsDeleteAccountModal(true);
  };

  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModal(false);
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
            <button className="change-password" onClick = {handleChangePasswordModal}>Change password</button>
          </div>
        </div>

        <div className='mailing-preferences-container'>
          <h1 className="select-preferences">Select mailing preferences</h1>
          <div className= "mailing-preferences">
            <div className="row" style={{width: "100%"}}>
              <div className="col-4">
                <p>When to mail</p>
                <label>
                  <input type="checkbox" /> Start of sale
                </label>
                <div className="premium-feature"
                data-tip="This is a premium feature"
                onClick={handlePremiumClick}
                style={{ position: 'relative' }} // Add this line
              >
                <FontAwesomeIcon 
                  icon={faCrown} 
                  className='crown'
                />
                <label>
                  <input type="checkbox" disabled /> One day before sale
                </label>
              </div>
              </div>
              <div className="col-4">
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

              <div className='col-4'>
              <div className='lower-update-button'>
                <button className="change-password">Update prefrences</button>
              </div>
              </div>
            </div>
          </div>

        <div className='row' style={{width: "100%"}}>
          <div className='col-6'>
            <div className="delete-account-perm-container">
              <button className="request-account-perm">Request feature</button>
            </div>
        </div>
        <div className='col-6'>
          <div className="delete-account-perm-container">
            <button onClick = {handleDeleteAccountModal}className="delete-account-perm">Delete account permently</button>
          </div>
        </div>

        </div>
        {isPremiunmModalOpen && <PremiumModal closeModal={closePremiumModal} />}
        {isChangePasswordModalOpen && <ChangePasswordModal closeModal={closeChangePasswordModal} />}
        {isDeleteAccountModal && <DeleteAccountModal closeModal={closeDeleteAccountModal} />}


      </div>

        </div>
        

    );
  };


  return currentUser ? (
settings()
  ) : loading();
}

export default DashboardSettings;
