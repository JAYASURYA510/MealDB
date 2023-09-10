import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Heaader from './Heaader';
 import './App.css'



const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
  const [noFoodFound, setNoFoodFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (response.data.meals) {
          setMeals(response.data.meals);
          setNoFoodFound(false);
        } else {
          setMeals([]);
          setNoFoodFound(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Heaader />
      <Container>
        <Row>
          <Col md={12}>
            <Form>
              <Form.Group controlId="searchForm">
                <Form.Control type="text" placeholder="Search for food" onChange={handleSearch} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {noFoodFound && (
          <Row>
            <Col md={12}>
              <Alert variant="danger">No food found.</Alert>
            </Col>
          </Row>
        )}
        <Row>
          {meals.map((meal) => (
            <Col md={4} key={meal.idMeal}>
              <Card className="my-3">
              <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
                <Card.Body>
                  <Card.Title>{meal.strMeal}</Card.Title>
                  <Button variant="primary" href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;
