import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from 'utils/videoplayer';
import Questionnaire from 'utils/questionnaire';
import ProgressBar from 'utils/progressbar';
import Header from 'components/Headers/Header';
import { CardBody, Card, Container, CardHeader, Col, FormGroup, Row, CardTitle, Button } from 'reactstrap';
import axiosInstance from 'utils/axios';
import { URLS } from 'URL';
import { useNavigate } from 'react-router-dom';

const CourseProceed = () => {
    const params = useParams();
    const [lessons, setLessons] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [videoLink, setVideoLink] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [progress, setProgress] = useState(0);
    const [percent, setPercent] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const navigate = useNavigate();
    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    useEffect(() => {
        // Fetch lessons for the course
        axiosInstance.get(`/courses/${params.courseid}/lessons/`).then(response => {
            setLessons(response.data);
            if (response.data.length > 0) {
                setVideoLink(extractVideoId(response.data[0].video_link));
                setQuestions(JSON.parse(response.data[0].questions));
                setProgress(0);
            }
        }).catch(err => {
            console.error('Error fetching lessons:', err);
        });
    }, [params.courseid]);

    const handleVideoEnd = () => {
        setShowQuestions(true);
    };

    const handleQuestionSubmit = async (answers) => {
        const correctAnswers = questions.filter((question, index) => {
          return question.answers[answers[index]].isCorrect;
        });
        console.log(answers);
        console.log("handleQuestionSubmit");
        console.log(`Number of correct answers: ${correctAnswers.length}`);
        console.log(`Number of questions: ${ questions.length}`);
        setTotalResults((prevTotalResults) => (prevTotalResults + correctAnswers.length));
        setTotalQuestions((prevTotalQuestions) => (prevTotalQuestions + questions.length));
        const results = (correctAnswers.length / questions.length) * 100;
        const id_lesson = lessons[currentLessonIndex].id;
      
        try {
          const response = await axiosInstance.post(URLS.COURSESENDRESULTS, {
            results,
            id_lesson,
            id_course: params.courseid,
          });
          console.log('Results submitted successfully:', response.data);
      
          // Move to the next lesson
          const nextLessonIndex = currentLessonIndex + 1;
          if (nextLessonIndex < lessons.length) {
            setCurrentLessonIndex(nextLessonIndex);
            const lesson = lessons[nextLessonIndex];
            setVideoLink(extractVideoId(lesson.video_link));
            setQuestions(JSON.parse(lesson.questions));
            setShowQuestions(false);
            setProgress(((nextLessonIndex + 1) / lessons.length) * 100);
          } else {
            // All lessons completed
            setProgress(100);
            // Optionally handle completion state
          }
          if (nextLessonIndex === lessons.length) {
            const bTR = totalResults + correctAnswers.length;
            const bTQ = totalQuestions + questions.length;
            console.log(bTR);
            console.log(bTQ);
            setPercent((bTR / bTQ) * 100);
            setIsEnd(true);
          }
        } catch (error) {
          console.error('Error submitting results:', error);
        }
      };
    const hadleReturnBtn = () => {
        navigate(`/admin/course-page/${params.courseid}`);
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
                        <CardHeader>
                            <ProgressBar progress={progress} />
                        </CardHeader>
                        <FormGroup className="d-flex justify-content-center">
                            {isEnd ? (
                                <div className="course-page">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <div className="col d-flex justify-content-center">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase mb-0"
                                                >
                                                    <p className="mt-4 mb-0 text-muted d-flex justify-content-center">
                                                        <span className="text-nowrap">Your results:  </span>
                                                        <span className="text-success mr-2">
                                                            <i className="fas fa-percent " /> {percent}
                                                        </span>{" "}
                                                    </p>
                                                </CardTitle>
                                            </div>
                                            <Button className="col d-flex justify-content-center">
                                                <div>
                                                    <tr onClick={() => hadleReturnBtn()} style={{ cursor: 'pointer' }}>
                                                        <base-button size="lg" type="primary">Return</base-button>
                                                    </tr>
                                                </div>
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : (
                                <div className="course-page">
                                    {!showQuestions ? (
                                        <VideoPlayer videoId={videoLink} onVideoEnd={handleVideoEnd} />
                                    ) : (
                                        <Questionnaire questions={questions} onSubmit={handleQuestionSubmit} />
                                    )}
                                </div>
                            )}
                        </FormGroup>
                    </Card>
                </CardBody>
            </Container>
        </>
    );
};

export default CourseProceed;