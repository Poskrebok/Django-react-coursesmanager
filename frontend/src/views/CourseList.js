import React, { useState, useEffect } from 'react';
import {
  Card, CardHeader, Table, Container, Row,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';
import CourseListHeader from 'components/Headers/CourseListHeader';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(URLS.COURSESLIMITED); // Adjust limit as needed
        setCourses(response.data);
      } catch (err) {

      }
    };
    fetchData();
  }, []);

  const handleRowClick = (courseId) => {
    /* history.push(`/courses/${courseId}`); // Redirect to the course detail page */
  };

  return (
    <>
      <CourseListHeader />
      {/* Page content */}
      <Container fluid className="mt--7">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Course List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Description</th>
                    <th scope="col">Pass Rate</th>
                  </tr>
                </thead>
              </Table>
              <Table className="align-items-center table-flush" responsive>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} onClick={() => handleRowClick(course.id)} style={{ cursor: 'pointer' }}>
                        <th scope="col">{course.name}</th>
                        <th scope="col">{course.description}</th>
                        <th scope="col">{course.pass_rate}</th>
                      </tr>
                    ))}
                  </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CourseList;
