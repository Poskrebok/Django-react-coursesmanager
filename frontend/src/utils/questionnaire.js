import React, { useState } from 'react';
import { Button, FormGroup, Input, Label, CardBody, Card, Container, Row, Col } from 'reactstrap';

const Questionnaire = ({ questions, onSubmit }) => {
  if (typeof questions === 'string') {
    questions = JSON.parse(questions);
  }
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  console.log(answers);
  if (questions.length === 0) {
    return <p>No questions available.</p>;
  }

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    console.log(newAnswers);
    console.log(answerIndex);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  // Add error checking for invalid question objects
  if (!currentQuestion || !currentQuestion.text || !currentQuestion.answers) {
    return <p>Invalid question structure: </p>;
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAnswered = answers[currentQuestionIndex] !== null;

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Col lg="6">
        <Card  style={{ minHeight: '400px', minWidth: '400px' }} >
          <CardBody>
            <div className="d-flex flex-column">
              <h3 className="mb-3">{currentQuestion.text}</h3>
              <div className="d-flex flex-wrap">
                <div >
                  {currentQuestion.answers.map((answer, index) => (
                    <Label key={index} className="d-flex align-items-center mb-5 col-12">
                      <Input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={index}
                        checked={answers[currentQuestionIndex] === index}
                        onChange={() => handleAnswerChange(currentQuestionIndex, index)}
                      />
                      <span className="ml-2">{answer.text}</span>
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Button
          color={isLastQuestion ? "success" : "primary"}
          onClick={isLastQuestion ? handleSubmit : () => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          disabled={!isAnswered || (isLastQuestion && answers.includes(null))}
          className="fixed-bottom m-4"
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </Col>
    </Container>
  );
};

export default Questionnaire;