import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Overall = ({ course }) => {
   return (
      <div>
         <h3 className="text-primary border-bottom mt-4">Overrall Infomation</h3>
         <Form className="p-2">
            <Form.Group className="mb-3" controlId="courseTitle">
               <Form.Label className="fw-semibold">Course title</Form.Label>
               <Form.Control
                  type="text" placeholder="Enter title"
                  defaultValue={course.title}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="courseCategory">
               <Form.Label className="fw-semibold">Category</Form.Label>
               <Form.Select aria-label="Default select example">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="3">Three</option>
               </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseLevel">
               <Form.Label className="fw-semibold">Levels</Form.Label>
               <Form.Select aria-label="Default select example">
                  <option selected={course.level === "BEGINNER"} value="BEGINNER">Beginner</option>
                  <option selected={course.level === "INTERMEDIATE"} value="INTERMEDIATE">Intermediate</option>
                  <option selected={course.level === "ADVANCED"} value="ADVANCED">Advanced</option>
               </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseDescription">
               <Form.Label className="fw-semibold">Description</Form.Label>
               <Form.Control
                  as="textarea" defaultValue={course.description} placeholder="Enter description for your course..."
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseImg">
               <Form.Label className="fw-semibold">Thumbnail Image (URL)</Form.Label>
               <Form.Control
                  type="url" placeholder="URL to thumbnail image..."
               />
            </Form.Group>

            <div className="d-flex justify-content-end">
               <Button variant="primary" type="submit">
                  Save Changes
               </Button>
            </div>

         </Form>
      </div>
   )
}

export default Overall