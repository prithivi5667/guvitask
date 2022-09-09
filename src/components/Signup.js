import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Card, Button, Form,  Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
//const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const schema = yup.object().shape({
    username: yup
      .string()
      .required("Please enter your first name")
      .min(2)
      .max(24),
    name: yup.string().required("Please enter your last name").min(2).max(24),
    
    email: yup.string().email().required("Email is invalid"),
    
    password: yup
      .string()
      .min(
        6,
        "Passwords must be at least 6 characters, and contain one special character"
      )
      .max(24)
      .required("Enter your password"),
    confirmPassword: yup
      .string()
      .required("Type your password again")
      .oneOf([yup.ref("password")], "Passwords must match")
  });
const Signup = () => {
    let [redirect, setRedirect] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
      });
    
     
      const [resStatus, setResStatus] = useState("");
    
      const onSubmitHandler = (data) => {
        
        console.log(data);
    
        axios
          .post("https://guvipt.herokuapp.com/api/user/register", data)
          .then(function (response) {
            console.log(response.status);
            if (response.status === 200) {
              setResStatus("Successful Registration!");
              setRedirect(true);
            } else {
              setResStatus("error");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      if (redirect) return <Redirect to="/login" />
      console.log(resStatus);
    
      return (
        <>
          <Container>
            <Row className="justify-content-md-center">
              <Card className="registerCardPage">
                <Card.Header as="h5" className="registerCardHeader">
                  Register for an Account
                </Card.Header>
                <Card.Body>
                  {/* First Name */}
                  <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <input
                        {...register("username")}
                        type="text"
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.username?.message}
                      </div>
                    </Form.Group>
    
                    {/* Last Name */}
                    <Form.Group>
                      <Form.Label> Name</Form.Label>
                      <input
                        {...register("name")}
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    </Form.Group>
                    
                    
    
                    {/* Email Address */}
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <input
                        {...register("email")}
                        type="text"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </Form.Group>
    
                   
    
                   
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <input
                        {...register("password")}
                        type="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </Form.Group>
                  
                    <Form.Group>
                      <Form.Label>Confirm Password</Form.Label>
                      <input
                        {...register("confirmPassword")}
                        type="password"
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.confirmPassword?.message}
                      </div>
                    </Form.Group>
    
                    
    
                    <Button className="registerButton" type="submit">
                      Register
                    </Button>
                    <div>
                      Status:
                      <p id="status">{resStatus}</p>
                    </div>
                  </Form>
                  <Card.Text id="linkText">
                    Already have an account? Click
                    <a href="Login" className="aLink">
                      Here
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </>
      );
    };

export default Signup;

// let [redirect, setRedirect] = useState(false);

// const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password === confirmPassword) {
//         const newUser = { name, email, password }

//         axios.post('https://merchent-app.herokuapp.com/api/users/register', newUser)
//         .then(response => {
//             console.log(response);
//             setRedirect(true);
//         })
//         .catch(error => console.log(error));
//     }
// }

// if (redirect) return <Redirect to="/login" />

