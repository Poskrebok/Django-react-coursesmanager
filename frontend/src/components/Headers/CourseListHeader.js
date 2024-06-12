
import { Card, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "utils/userContext";
import { useContext } from 'react';

const CourseListHeader = () => {
  const navigator = useNavigate();
  const { userRole, setUserRole } = useContext(UserContext);
  const handleClick = () => {
    navigator("/admin/create-course");
  };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                { userRole === 2 ?
                  (<Button>
                    <div>
                      <tr onClick={() => handleClick()} style={{ cursor: 'pointer' }}>
                        <base-button size="lg" type="primary">Create New Course</base-button>
                      </tr>
                    </div>
                  </Button>) : (<></>)
                }
              </Col>
              <Col lg="6" xl="3">
              </Col>
              <Col lg="6" xl="3">
              </Col>
              <Col lg="6" xl="3">
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CourseListHeader;
