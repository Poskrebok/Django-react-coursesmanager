import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, Container, Row,
    Col, Input, Button, Form, FormGroup, Label
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Headers/Header';
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';

const CreateLesson = () => {
    const history = useNavigate();
    const [name, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ name, description, file });
        try{
            const payload = {
                name,
                description,
              };
            await axiosInstance.post(URLS.CREATECOURSE, payload);
        } catch(err) {
            
        }
    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container fluid className="mt--7">
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Course creation</h3>
                            </CardHeader>
                        </Card>
                    </div>
                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 className="mb-0">Add New Course</h3>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row className="justify-content-center">
                                        <Col lg="8">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-course-name">Enter name of the course</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-course-name"
                                                    placeholder="Course Name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setCourseName(e.target.value)}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-course-description">Enter Description</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-course-description"
                                                    placeholder="Course Description"
                                                    type="textarea"
                                                    rows="4"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-course-preview-img">Add Preview img</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-course-preview-img"
                                                    placeholder="Preview Image URL"
                                                    type="text"
                                                    //!create img handler
                                                />
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button color="primary" onClick={handleSubmit}>Submit</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateCourse;
