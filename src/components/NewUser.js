import React, { useEffect, useState, useContext} from 'react';
import { getAuth, signInWithEmailAndPassword , confirmPasswordReset, connectAuthEmulator  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./CTX/UserContext"
import { collection, addDoc, getDocs,query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword } from "firebase/auth";

const PasswordReset = () => {
  const [emailCheck , setEmailCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

    // Generate a temporary password 
    const generateTempPassword = () => {
      const list_of_character = "qazwsxedcrfvtgbyhnujmik,ol.p;/[']1234567890";
      let password = "";
    
      for (let i = 0; i < 10; i++) {
        password += list_of_character.charAt(Math.floor(Math.random() * list_of_character.length));
      }
    
      return password;
    };
  
    // Create an account for the user
    const handleCreateAccount = async () => {
      const tempPassword = generateTempPassword();
      const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword)
      return { user: userCredential.user, password: tempPassword };
      }
  
  
    // Create the user in the firestore database
    const addDocument = async () => {
      const {user, password} = await handleCreateAccount();
      console.log("This si the user")
      console.log(user)
      
  
      try {
        const usersCollection = collection(db, 'Users');
        const docRef = await addDoc(usersCollection, {
          id : user.uid,
          email: email,
          brands: [],
        });
  
        try{
          const mailingCollection = collection(db, "mail");
          const docRefmail = await addDoc(mailingCollection , {
            to : email,
            message : {
              subject : "Welcome at Whizzle",
              text : `Thank you for signing up, use the following password to login ${password}`,
              html : ""
  
            }
          })
  
          console.log("Sending mail to", docRefmail.id)
        }catch (error){
          console.log("Something went wrong with sending the mail")
        }
    
        console.log('Document written with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  
    // Send an email to user
    const does_user_exist = async (email) => {
     
      // Query the database where 'email' field equals to the provided email
      const userCollection = collection(db, 'Users');    
      const q = query(userCollection, where("email", "==", email));
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        return true
      } else {
        return false;
      }
  
    }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setEmailCheck(true)
    addDocument();
  }



  return (
    !emailCheck ? (
      <div>
        <section id="signin-section" className="d-flex align-items-center">
          <div className="signin-container">
            <h1>Enter your Email</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    ) : (
      <div>
        <section id="signin-section" className="d-flex align-items-center">
          <div className="signin-container">
            <h1>Thank you!</h1>
            <p>Please check your email for further instructions to recieve your password. You can add brands in the dashboard!</p>
          </div>
        </section>
      </div>
    )
  );
};

export default PasswordReset;
