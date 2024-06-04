import React, { useState } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';

const Questionnaire = ({ questions, onSubmit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  
    if (questions.length === 0) {
      return <p>No questions available.</p>;
    }
  
    const handleAnswerChange = (questionIndex, answerIndex) => {
      const newAnswers = [...answers];
      newAnswers[questionIndex] = answerIndex;
      setAnswers(newAnswers);
    };
  
    const handleSubmit = () => {
      onSubmit(answers);
    };
  
    const currentQuestion = questions[currentQuestionIndex];
    console.log(questions[currentQuestionIndex]);
    // Add error checking for invalid question objects
    if (!currentQuestion || !currentQuestion.text || !currentQuestion.answers) {
      return <p>Invalid question structure: {JSON.stringify(currentQuestion)}</p>;
    }
  
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isAnswered = answers[currentQuestionIndex] !== null;
  
    return (
      <div>
        <h5>{currentQuestion.text}</h5>
        {currentQuestion.answers.map((answer, index) => (
          <FormGroup key={index}>
            <Label>
              <Input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={index}
                checked={answers[currentQuestionIndex] === index}
                onChange={() => handleAnswerChange(currentQuestionIndex, index)}
              />
              {answer.text}
            </Label>
          </FormGroup>
        ))}
        {!isLastQuestion && (
          <Button
            color="primary"
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={!isAnswered}
          >
            Next
          </Button>
        )}
        {isLastQuestion && (
          <Button color="success" onClick={handleSubmit} disabled={answers.includes(null)}>
            Submit
          </Button>
        )}
      </div>
    );
  };

export default Questionnaire;