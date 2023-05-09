import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
