import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
} from "reactstrap";

import { URLS } from '../URL';
import axiosInstance from '../utils/axios.js'
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { UserContext } from "utils/userContext";
import { useContext } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { userRole, setUserRole } = useContext(UserContext);

  const loginUser = async (event) => {
    event.preventDefault();
    const credentials = { username, password };

    try {
      const { data } = await axiosInstance.post(URLS.TOKEN, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      await axiosInstance.get(URLS.GETROLE).then(response => {
        setUserRole(response.data.role)
      });
      navigate('/admin/profile');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    /* should change it to the login later */
                    placeholder="Login"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={loginUser}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>{/* Forgot password? */}</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <NavLink>
              <a
                className="text-light"
                href="/auth/register"
              >
                <small>Create new account</small>
              </a>
            </NavLink>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
