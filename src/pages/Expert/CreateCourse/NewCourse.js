import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'
import expertApi from '../../../_actions/expertApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NewCourse = () => {
   const [validated, setValidated] = useState(false);

   const token = useRecoilValue(authAtom);

   const setToast = useSetRecoilState(toastAtom);

   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: 'onSubmit',
   });

   const onSubmit = async (data) => {
      data.is_public = false;
      console.log(token);
      try {
         const createCourse = await expertApi.createCourse(token, data);
         console.log(createCourse);
         setValidated(true);
         const id = createCourse.data.detail;
         navigate(`/expert/course/edit/${id}`);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className='container d-flex w-100 rounded-4 justify-content-center align-items-center border '>
         <Form validated={validated} onSubmit={handleSubmit(onSubmit)} className="col-8 d-flex flex-column justify-content-center">
            <h4 className='mt-5 mb-4 text-primary fw-bold'>Overall about your course.</h4>

            <Form.Group className="mb-3" controlId="courseTitle">
               <Form.Label className="fw-semibold">Course title</Form.Label>
               <Form.Control
                  {...register("title", {
                     required: true
                  })}
                  isInvalid={errors.title}
                  type="text" placeholder="Enter title"
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
               <Form.Select
                  {...register("level", {
                     required: true
                  })}
                  isInvalid={errors.level}
                  aria-label="Default select example"
               >
                  <option disabled selected value="">Choose Level</option>
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
               </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseDescription">
               <Form.Label className="fw-semibold">Description</Form.Label>
               <Form.Control
                  {...register("description", {
                     required: true
                  })}
                  isInvalid={errors.description}
                  as="textarea" placeholder="Enter description for your course..."
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseImg">
               <Form.Label className="fw-semibold">Thumbnail Image (URL)</Form.Label>
               <Form.Control
                  {...register("image", {
                     required: true
                  })}
                  isInvalid={errors.image}
                  type="url" placeholder="URL to thumbnail image..."
               />
            </Form.Group>

            <Button className='rounded-0 w-25 px-3 py-2 fw-semibold align-self-center mb-4 mt-3' variant="primary" type="submit">
               {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
               </div>} Create Course
            </Button>
         </Form>
      </div>
   );
}

export default NewCourse;