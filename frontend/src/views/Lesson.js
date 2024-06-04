import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, Container, Row,
    Col, Input, Button, Form, FormGroup, Label
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from 'components/Headers/Header';
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';

const LessonPage = () => {
    const history = useNavigate();
    const params = useParams();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

        } catch (err) {

        }
    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container fluid className="mt--7">

            </Container>
        </>
    );
};

export default LessonPage;
