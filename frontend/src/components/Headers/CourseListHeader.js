
import { Card, CardBody, CardTitle, Container, Row, Col,Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const CourseListHeader = () => {
  const navigator = useNavigate();
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
              <Button>
                <div>
                <tr onClick={() => handleClick()} style={{ cursor: 'pointer' }}>
                  <base-button size="lg" type="primary">Create New Course</base-button>
                </tr>
                </div>
              </Button>
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
