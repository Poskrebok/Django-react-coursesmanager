import React, { useState, useEffect } from 'react';
import {
  Card, CardHeader, Table, Container, Row,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';
import CourseListHeader from 'components/Headers/CourseListHeader';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import routes from 'routes';

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
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.name === "Course") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  }; //
  const handleRowClick = (courseId) => {
     history(`/admin/course-page/${courseId}`);
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
      <Routes>
          {getRoutes(routes)}
        </Routes>
    </>
  );
};

export default CourseList;
