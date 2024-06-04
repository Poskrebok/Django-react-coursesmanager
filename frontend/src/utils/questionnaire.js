import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch('questions.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setAnswers(Array(data.length).fill(undefined));
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log(answers);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAnswered = answers[currentQuestionIndex] !== undefined;

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
        <Button color="primary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} disabled={!isAnswered}>
          Next
        </Button>
      )}
      {isLastQuestion && (
        <Button color="success" onClick={handleSubmit} disabled={answers.includes(undefined)}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default Questionnaire;

