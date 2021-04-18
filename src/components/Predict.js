import React, {useState} from 'react';
import {Container, Button, Form, Col, Modal} from "react-bootstrap";

import {Formik, Field, Form as FormikForm} from "formik";
import {predict} from './request/request'

export default function Predict() {

    const [answer, setAnswer] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (data) => {
        predict(data.data).then((response) => {
            setAnswer(!!+response.data.predict)
        }).then(() => handleShow())
    }


    return (
        <>
            <Container className="forms">
                <Formik
                    initialValues={{

                        passengerId: ''
                        , pClass: ''
                        , Sex_Male: false
                        , Sex_Female: false
                        , Age: ''
                        , SibSp: ''
                        , Parch: ''
                        , Fare: ''
                        , Embarked_S: false
                        , Embarked_C: false
                        , Embarked_Q: false

                    }}
                    onSubmit={(data, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        handleSubmit({data})
                        resetForm(true);
                    }}>
                    {({values, isSubmitting}) => (
                        <FormikForm id="predictData">


                            <Form.Group controlId="formPassenger">
                                <Form.Label>Passenger ID</Form.Label>
                                <Field placeholder="Enter Id" name="passengerId" type="number"
                                       value={values.passengerId}
                                       as={Form.Control}/>
                            </Form.Group>

                            <Form.Group controlId="formPClass">
                                <Form.Label>Passenger Class</Form.Label>
                                <Field placeholder="Enter Passenger Class" name="pClass" type="number"
                                       value={values.pClass}
                                       as={Form.Control}/>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formSex">
                                    <Form.Label as="legend" column sm={2}>
                                        Select Sex
                                    </Form.Label>

                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="Sex"
                                            onChange={() => {
                                                values.Sex_Male = true
                                                values.Sex_Female = false
                                            }}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="Sex"
                                            onChange={() => {
                                                values.Sex_Male = false
                                                values.Sex_Female = true
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form.Row>


                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Field placeholder="Enter Age" name="Age" type="number" value={values.Age}
                                       as={Form.Control}/>
                            </Form.Group>

                            <Form.Row>

                                <Form.Group as={Col} controlId="formSibSp">
                                    <Form.Label>Siblings/Spouse Aboard</Form.Label>
                                    <Field placeholder="Number" name="SibSp" type="number" value={values.SibSp}
                                           as={Form.Control}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formParch">
                                    <Form.Label>Parents/Children Aboard</Form.Label>
                                    <Field placeholder="Number" name="Parch" type="number" value={values.Parch}
                                           as={Form.Control}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formFare">
                                <Form.Label>Fare</Form.Label>
                                <Field placeholder="Enter Fare" name="Fare" type="number" value={values.Fare}
                                       as={Form.Control}/>
                            </Form.Group>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formSex">
                                    <Form.Label as="legend" column sm={2}>
                                        Select Embarked
                                    </Form.Label>

                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="S"
                                            name="Embarked"
                                            onChange={() => {
                                                values.Embarked_S = true
                                                values.Embarked_C = false
                                                values.Embarked_Q = false
                                            }}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="C"
                                            name="Embarked"
                                            onChange={() => {
                                                values.Embarked_S = false
                                                values.Embarked_C = true
                                                values.Embarked_Q = false
                                            }}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Q"
                                            name="Embarked"
                                            onChange={() => {
                                                values.Embarked_S = false
                                                values.Embarked_C = false
                                                values.Embarked_Q = true
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form.Row>


                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </FormikForm>
                    )}
                </Formik>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Prediction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>The Person would've { answer ? "Survived": "Died"}</Modal.Body>
                </Modal>

            </Container>
        </>
    )

}