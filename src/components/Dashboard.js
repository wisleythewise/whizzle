import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { auth } from '../firebaseConfig';

import { isSignInWithEmailLink ,signInWithEmailLink  } from "firebase/auth"; // Import the function

const Dashboard = () => {

  // Add check if the user is present in our user db
  // if not show a screen where it states oops seems you are not signed up
  // Otherwise show the dashboard based on the user data.

  useEffect(() => {
    let email = window.localStorage.getItem('emailForSignIn');

    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (!email) {
        // Ask user for their email for confirmation
        email = window.prompt('Please provide your email for confirmation');
        window.localStorage.setItem('emailForSignIn', email);
      }
      
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
          console.error("Error signing in with email link:", error);
        });
    }
  }, []);


  return (

    <section id="hero" className="d-flex align-items-center">

    <div className="container">
    <Container>
      <h1 className="my-4">Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Card 1</Card.Title>
              <Card.Text>
                This is a sample dashboard card. You can add more content here.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Card 2</Card.Title>
              <Card.Text>
                This is another dashboard card. Add more content as needed.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Card 3</Card.Title>
              <Card.Text>
                This is the third dashboard card. Customize it with your content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>


    </div>

  </section>


  );
};

export default Dashboard;
