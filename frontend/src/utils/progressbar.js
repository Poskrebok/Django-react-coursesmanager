import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = ({ progress }) => {
    return (
        <Progress value={progress} />
    );
};

export default ProgressBar;