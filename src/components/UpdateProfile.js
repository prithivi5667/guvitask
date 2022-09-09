import React, { useState } from "react";
import { Container, Card, Button, Form,  Row } from "react-bootstrap";
//import "../styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

const schema = yup.object().shape({
 
  age: yup.string().required("Please enter your last name").min(2).max(24),
  phoneNumber: yup.number().required("Please enter digits only"),
  gender: yup.string().required("gender is invalid"),
  dob: yup.string().required("Please enter your date of birth question"),
  
});

const UpdateProfile = (props) => {
    const userid=props.user.id;
    console.log(userid)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

 // const [role, setRole] = useState("tech");
  const [resStatus, setResStatus] = useState("");

  const onSubmitHandler = (data) => {
    
    console.log(data);

    axios
      .put(`http://localhost:5000/api/user/${userid}`, data)
      .then(function (response) {
        console.log(response.status);
        if (response.status === 200) {
          setResStatus("Successful Registration!");
        } else {
          setResStatus("error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(resStatus);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Card className="registerCardPage">
            <Card.Header as="h5" className="registerCardHeader">
              Update Your profile
            </Card.Header>
            <Card.Body>
              
              <Form onSubmit={handleSubmit(onSubmitHandler)}>
               

                
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <input
                    {...register("age")}
                    type="text"
                    className={`form-control ${
                      errors.age ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.age?.message}
                  </div>
                </Form.Group>
                {/* Phone Number */}
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <input
                    {...register("phoneNumber")}
                    type="text"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.phoneNumber?.message}
                  </div>
                </Form.Group>

                {/* Email Address */}
                <Form.Group>
                  <Form.Label>gender</Form.Label>
                  <br/>
                  <input type="radio" id="gender" name="gender" value="Male" {...register("gender")}
                    
                    className={` ${
                      errors.gender ? "is-invalid" : ""
                    }`}/>
                      <label for="html">Male</label><br/>
                      <input type="radio" id="css" name="gender" value="Female"{...register("gender")}
                    
                    className={` ${
                      errors.gender ? "is-invalid" : ""
                    }`}/>
                      <label for="css">Female</label>
                  
                  <div className="invalid-feedback">
                    {errors.gender?.message}
                  </div>
                </Form.Group>

               
                <Form.Group>
                  <Form.Label>
                  Birthday:
                  </Form.Label>
                  <br/>
                 
  <input type="date" id="birthday" name="birthday"{...register("dob")}
                    
                    className={` ${
                      errors.dob ? "is-invalid" : ""
                    }`}
                  />
                 
                  <div className="invalid-feedback">
                    {errors.dob?.message}
                  </div>
                </Form.Group>

                

                <br/>

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



export default UpdateProfile
