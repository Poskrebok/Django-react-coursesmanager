import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

const IndexPage = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg="8">
                    <Card>
                        <CardHeader>
                            <h3>Main Page</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Welcome to the main page! From here, you can manage courses, view student profiles, and more. Use the buttons below to navigate to different sections of the panel.</p>
                        </CardBody>
                        <CardBody className="d-flex justify-content-between">
                            <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/admin/user-profile">
                                <i className="ni ni-single-02 text-yellow mr-2"></i>
                                Main Profile
                            </Button>
                            <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/admin/create-course">
                                <i className="ni ni-paper-diploma text-orange mr-2"></i>
                                Create Course
                            </Button>
                        </CardBody>
                        <CardBody className="d-flex justify-content-between">
                            <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/admin/students">
                                <i className="ni ni-hat-3 text-primary mr-2"></i>
                                Student List
                            </Button>
                            <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/auth/logout">
                                <i className="ni ni-key-25 text-info mr-2"></i>
                                Logout
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;