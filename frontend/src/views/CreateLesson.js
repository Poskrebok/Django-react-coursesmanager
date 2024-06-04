import React, { useState, useEffect } from 'react';
import {
    Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Button
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';
import Header from 'components/Headers/Header';
import { useParams } from 'react-router-dom';

const CreateCourse = () => {
    const history = useNavigate();
    const params = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        video_link: '',
        questions: [],
        course_id: ''
    });

    useEffect(() => {
        // Any side effects can go here
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleQuestionChange = (index, event) => {
        const { name, value } = event.target;
        const updatedQuestions = formData.questions.map((question, qIndex) =>
            qIndex === index ? { ...question, [name]: value } : question
        );
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleAnswerChange = (qIndex, aIndex, event) => {
        const { name, value } = event.target;
        const updatedQuestions = formData.questions.map((question, questionIndex) => {
            if (questionIndex === qIndex) {
                const updatedAnswers = question.answers.map((answer, answerIndex) =>
                    answerIndex === aIndex ? { ...answer, [name]: value } : answer
                );
                return { ...question, answers: updatedAnswers };
            }
            return question;
        });
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleAddQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { text: '', answers: [{ text: '', isCorrect: false }] }]
        });
    };

    const handleAddAnswer = (qIndex) => {
        const updatedQuestions = formData.questions.map((question, questionIndex) => {
            if (questionIndex === qIndex) {
                return { ...question, answers: [...question.answers, { text: '', isCorrect: false }] };
            }
            return question;
        });
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleCorrectAnswerChange = (qIndex, aIndex) => {
        const updatedQuestions = formData.questions.map((question, questionIndex) => {
            if (questionIndex === qIndex) {
                const updatedAnswers = question.answers.map((answer, answerIndex) => ({
                    ...answer,
                    isCorrect: answerIndex === aIndex
                }));
                return { ...question, answers: updatedAnswers };
            }
            return question;
        });
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert formData.questions to JSON
        console.log(params);
        formData.course_id = params.courseid;
        const dataToSubmit = {
            ...formData,
            questions: JSON.stringify(formData.questions)
        };
        console.log(dataToSubmit);
        try {
            await axiosInstance.post(`${URLS.COURSES}${params.courseid}/create-lesson/`, dataToSubmit);
            history(`/admin/course-page/${params.courseid}`)
        } catch (error) {

        }
        // Handle form submission logic here, e.g., send data to a server
    };

    return (
        <>
            <Header />
            <Container fluid className="mt--7">
                <Row className="justify-content-center">
                    <Col lg="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Course Form</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <label htmlFor="name">Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="description">Description</label>
                                        <Input
                                            type="textarea"
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="video_link">Video Link</label>
                                        <Input
                                            type="url"
                                            className="form-control"
                                            id="video_link"
                                            name="video_link"
                                            value={formData.video_link}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        {formData.questions.map((question, qIndex) => (
                                            <div key={qIndex} className="mb-4">
                                                <Input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    placeholder={`Question ${qIndex + 1}`}
                                                    name="text"
                                                    value={question.text}
                                                    onChange={(e) => handleQuestionChange(qIndex, e)}
                                                    required
                                                />
                                                {question.answers.map((answer, aIndex) => (
                                                    <div key={aIndex} className="d-flex align-items-center mb-2">
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={`Answer ${aIndex + 1}`}
                                                            name="text"
                                                            value={answer.text}
                                                            onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                                                            required
                                                        />
                                                        <Input
                                                            type="radio"
                                                            className="ml-2"
                                                            name={`correct-${qIndex}`}
                                                            checked={answer.isCorrect}
                                                            onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
                                                        />
                                                    </div>
                                                ))}
                                                <Button
                                                    color="info"
                                                    onClick={() => handleAddAnswer(qIndex)}
                                                    className="mt-2"
                                                >
                                                    Add Answer
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            color="primary"
                                            onClick={handleAddQuestion}
                                            className="mt-3"
                                        >
                                            Add Question
                                        </Button>
                                    </FormGroup>

                                    <div className="text-center">
                                        <Button type="submit" color="primary">Submit</Button>
                                    </div>
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