import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from 'utils/videoplayer';
import Questionnaire from 'utils/questionnaire';
import ProgressBar from 'utils/progressbar';
import Header from 'components/Headers/Header';
import { CardBody, Card, Container, CardHeader, Col,FormGroup } from 'reactstrap';
import axiosInstance from 'utils/axios';

const CourseProceed = () => {
    const params = useParams();
    const [lessons, setLessons] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [videoLink, setVideoLink] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fetch lessons for the course
        axiosInstance.get(`/courses/${params.courseid}/lessons/`).then(response => {
            setLessons(response.data);
            if (response.data.length > 0) {
                setVideoLink(response.data[0].video_link);
                console.log(response.data[0].video_link);
                setQuestions(response.data[0].questions);
                console.log(response.data[0].questions);
                setProgress(0);
            }
        }).catch(err => {
            console.error('Error fetching lessons:', err);
        });
    }, [params.courseid]);

    const handleVideoEnd = () => {
        setShowQuestions(true);
    };

    const handleQuestionSubmit = (answers) => {
        const correctAnswers = questions.filter((q, i) => q.answers[answers[i]].isCorrect);
        const result = (correctAnswers.length / questions.length) * 100;
        const lessonId = lessons[currentLessonIndex].id;


        axios.post('courses/reciveLessonResults/', {  // ensure userId is available from params or context
            result,
            lessonId,
            courseId: params.courseid,
        }).then(response => {
            console.log('Results submitted successfully:', response.data);

            // Move to the next lesson
            const nextLessonIndex = currentLessonIndex + 1;
            if (nextLessonIndex < lessons.length) {
                setCurrentLessonIndex(nextLessonIndex);
                setVideoLink(lessons[nextLessonIndex].videoLink);
                setQuestions(lessons[nextLessonIndex].questions);
                setShowQuestions(false);
                setProgress(((nextLessonIndex) / lessons.length) * 100);
            } else {
                // All lessons completed
                setProgress(100);
                // Optionally handle completion state
            }
        }).catch(error => {
            console.error('Error submitting results:', error);
        });
    };

    return (
        <>
            <Header />
            <Container fluid className="mt--7">
                <CardBody>
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex justify-content-between">
                            <h3 className="mb-0">Course</h3>
                        </CardHeader>
                        <FormGroup className="d-flex justify-content-center">
                            <div className="course-page">
                                <ProgressBar progress={progress} />
                                {!showQuestions ? (
                                    <VideoPlayer videoId={videoLink} onVideoEnd={handleVideoEnd}    />
                                ) : (
                                    <Questionnaire questions={questions} onSubmit={handleQuestionSubmit} />
                                )}
                            </div>
                        </FormGroup>
                    </Card>
                </CardBody>
            </Container>
        </>
    );
};

export default CourseProceed;