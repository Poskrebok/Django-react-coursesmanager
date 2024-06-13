import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { URLS } from "URL";
import axiosInstance from "utils/axios";


const IndexPage = () => {
    const [role, setRole] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [numOfCourses, setNumOfCourse] = useState();
    const [numOfStudents, setNumOfStudents] = useState();

    const getData = () => {
        axiosInstance.get(URLS.GETPROFILE).then((response) => {
            console.log(response);
            setRole(response.data.role);
            setFirstname(response.data.first_name);
            setLastname(response.data.last_name);
        }).catch(error => {
            console.error('Error fetching profile:', error);
        })
        axiosInstance.get(URLS.COUNTCOURSES).then((response) => {
            console.log(response);
            setNumOfCourse(response.data.courses_num)
        }).catch(error => {
            console.error('Error fetching profile:', error);
        })
        axiosInstance.get(URLS.COUNTSRUDENTS).then((response) => {
            console.log(response);
            setNumOfStudents(response.data.student_num)
        }).catch(error => {
            console.error('Error fetching profile:', error);
        })
    };
    useEffect(() => {
        getData();
    }, [])

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col lg="8">
                    <Card>
                        <CardHeader>
                            <h3>Main Page</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Welcome to the main page! From here, you can manage courses, view student profiles, and more. Use the buttons below to navigate to different sections of the panel.</p>
                        </CardBody>
                        <Row className="d-flex justify-content-center">
                            <Col lg="6" xl="4">
                                <Card className="card-stats mb-7 mb-x1-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    {firstname}
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">{lastname}</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape">
                                                    <i className="ni ni-single-02 text-yellow mr-2" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/admin/user-profile">
                                            Go to Profile
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="4">
                                <Card className="card-stats mb-7 mb-x1-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Number of Courses
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">{numOfCourses}</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape">
                                                    <i className="ni ni-paper-diploma text-orange mr-2" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/admin/courses">
                                            Go to Courses
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            {role === 2 ?(
                            <Col lg="6" xl="4">
                                <Card className="card-stats mb-7 mb-x1-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Students
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">{numOfStudents}</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape">
                                                    <i className="ni ni-hat-3 text-primary mr-2" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/admin/students">
                                            Go to Students
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>) : (<></>)}
                        </Row>
                        <CardBody className="d-flex justify-content-between ">
                            <Button color="secondary" className="d-flex align-items-center" tag={Link} to="/auth/logout" >
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