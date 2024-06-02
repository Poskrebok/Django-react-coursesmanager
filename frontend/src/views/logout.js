import axiosInstance from "utils/axios";
import React from "react";
import { URLS } from "URL";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Button,
    Col,
  } from "reactstrap";

export const Logout = () => {
    const history = useNavigate();
    useEffect(() => {
        async function performLogout() {
            try {
                if (localStorage.getItem('access_token'))
                    await axiosInstance.post(
                        URLS.LOGOUT,
                        { refresh_token: localStorage.getItem('refresh_token') },
                        { withCredentials: true }
                    );
                // After successfully notifying the server about logout,
                // clear local storage and reset auth headers
                localStorage.clear();
                delete axiosInstance.defaults.headers.common['Authorization'];
            } catch (error) {
                // Handling errors if the logout process fails
                console.error('Logout failed', error);
                // Optionally, handle the user experience here, e.g., showing an error message
            }
        }
        performLogout();
    }, []);

    return (
        <>
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5 d-flex flex-column align-items-center">
                <Form role="form">
                  <FormGroup className="mb-3 text-center">
                    <p>Successfully logged out</p>
                    <Button
                      onClick={() => history('/auth/login')}
                      color="primary"
                    >
                      Return to Authentication
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </>
      );
}