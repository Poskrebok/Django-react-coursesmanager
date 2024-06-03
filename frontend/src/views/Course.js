import React, { useState, useEffect } from 'react';
import {
    Card, CardHeader, Table, Container, Row, Col, Button
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';
import Header from 'components/Headers/Header';
import { useParams } from 'react-router-dom';
import routes from 'routes';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

const CoursePage = () => {
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState([]);
    const history = useNavigate();
    const params = useParams()
    console.log(params.courseid)

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.name === "Lesson creator") {
                return (
                    <Route path={prop.path} element={prop.component} key={key} exact />
                );
            } else {
                return null;
            }
        });
    }; //

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`${URLS.COURSES}${params.courseid}/lessons`); // Adjust limit as needed
                setLessons(response.data);
            } catch (err) {

            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`${URLS.COURSES}${params.courseid}/`);
                setCourse(response.data);
            } catch (err) {

            }
        };
        fetchData();
    }, []);


    const handleRowClick = (courseId) => {
        /* history.push(`/courses/${courseId}`); // Redirect to the course detail page */
    };

    const handleLessonCreationBtn = () => {
        history(`/admin/course-page/${params.courseid}/lesson-create-page`);
    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container fluid className="mt--7">
                <Row>
                    <Col>
                        {/* New Course Info Card */}
                        <div className="card shadow mb-4">
                            <div className="card-header border-0">
                                <h3 className="mb-0">Course Information</h3>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">{course.name}</h4>
                                <p className="card-text">{course.description}</p>
                            </div>
                        </div>

                        {/* Existing Course Table Card */}
                        <Card className="card shadow">
                            <CardHeader className="card-header border-0">
                                <Row>
                                    <h3 className="mb-0">Lessons</h3>
                                    <Col className="text-right" xs="11">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={() => handleLessonCreationBtn()}
                                            size="sm"
                                        >
                                            Create Lesson
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table className="table align-items-center table-flush">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Lesson</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Pass Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.id} onClick={() => handleRowClick(lesson.id)} style={{ cursor: 'pointer' }}>
                                            <th scope="row">{lesson.name}</th>
                                            <td>{lesson.description}</td>
                                            <td>{lesson.pass_rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Routes>
                {getRoutes(routes)}
            </Routes>
        </>

    );
};

export default CoursePage;
