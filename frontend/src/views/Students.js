import React, { useState, useEffect } from 'react';
import {
  Card, CardHeader, Table, Container, Row,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import { URLS } from 'URL';
import axiosInstance from 'utils/axios';
import Header from 'components/Headers/Header';

const StudentList = () => {
  const [courses, setCourses] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axiosInstance.get(URLS.STUDENTSLIMITED); // Adjust limit as needed
        setCourses(response.data);
      }
      catch(err){
        //need to do smthing with error here
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (courseId) => {
    //maybe later i will add page with detailed information about user;
  };

  return (
    <>
    <Header />
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
                  <th scope="col">Name</th>
                  <th scope="col">Group</th>
                  <th scope="col">Etc.</th>{/* Will figure out later */}
                  <th scope="col" />
                </tr>
              </thead>
              </Table>
              <Table className="align-items-center table-flush" responsive>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} onClick={() => handleRowClick(course.id)} style={{ cursor: 'pointer' }}>
                      <td scope="col">{course.username}</td>
                      <td scope="col">{course.email}</td>
                      <td scope="col">{course.role}</td>
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

export default StudentList;
