import React, { useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

const Questionnaire = ({ questions, onSubmit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswerChange = (index, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[index] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        onSubmit(answers);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h5>{currentQuestion.text}</h5>
            {currentQuestion.answers.map((answer, index) => (
                <FormGroup key={index}>
                    <Input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={index}
                        onChange={() => handleAnswerChange(currentQuestionIndex, index)}
                    />
                    {answer.text}
                </FormGroup>
            ))}
            <Button
                color="primary"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex >= questions.length - 1}
            >
                Next
            </Button>
            {currentQuestionIndex >= questions.length - 1 && (
                <Button color="success" onClick={handleSubmit}>
                    Submit
                </Button>
            )}
        </div>
    );
};

export default Questionnaire;