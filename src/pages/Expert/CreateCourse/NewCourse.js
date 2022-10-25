import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Controller, useForm } from 'react-hook-form'
import expertApi from '../../../_actions/expertApi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom, categoriesAtom, toastAtom } from '../../../_state';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userApi from '../../../_actions/userApi';
import Select from 'react-select'

const NewCourse = () => {

   const [validated, setValidated] = useState(false);
   const [categories, setCategories] = useRecoilState(categoriesAtom);
   const token = useRecoilValue(authAtom);
   const [img, setImg] = useState();
   const setToast = useSetRecoilState(toastAtom);
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      control
   } = useForm({
      mode: 'onSubmit',
   });

   const loadCategories = async () => {
      try {
         let categoriesData = await (await userApi.getCategories()).data;

         categoriesData = categoriesData.map(({ id, name }) => ({
            label: name,
            value: id
         }))

         setCategories(categoriesData);
         //console.log(categoriesData);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadCategories();
   }, []);

   useEffect(() => {

   }, [img]);

   const onSubmit = async (data) => {
      data.is_public = false;
      data.category_id = data.categories.value;
      delete data.categories;
      data.image = img;
      console.log(data);
      try {

         const createCourse = await expertApi.createCourse(token, data);
         //console.log(createCourse);
         setValidated(true);
         const id = createCourse.data.detail;
         setToast({
            show: true,
            status: 'primary',
            msg: 'Create Course Success'
         })
         navigate(`/expert/course/edit/${id}`);

      } catch (error) {
         console.log(error);
      }
   }

   const handleUploadImage = async (e) => {
      console.log(e.target.files[0]);

      try {
         const image = e.target.files[0];
         const uploadId = await (await userApi.upload(token, image)).data.detail;
         console.log(uploadId);
         setImg(uploadId);
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
               <Form.Control.Feedback type="invalid">
                  Course title is required
               </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseCategory">
               <Form.Label className="fw-semibold">Category</Form.Label>
               <Controller
                  control={control}
                  name="categories"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                     <Select
                        options={categories}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                        selected={value}
                     />
                  )}
               />

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
               <Form.Control.Feedback type="invalid">
                  Course level is required
               </Form.Control.Feedback>
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
               <Form.Control.Feedback type="invalid">
                  Course description is required
               </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseImg">
               <Form.Label className="fw-semibold">Thumbnail Image</Form.Label>
               <Form.Control
                  {...register("image", {
                     required: true
                  })}
                  onChange={handleUploadImage}
                  type="file"
                  accept=".jpg, .png, .jpeg"
               />
            </Form.Group>
            <Form.Label className="fw-semibold">Preview Image:</Form.Label>
            {
               img && <>
                  <img width="200px" height="200px" className='border' src={`http://localhost:8000/upload/${img}`} alt="" />
               </>
            }
            <Button className='rounded-0 w-25 px-3 py-2 fw-semibold align-self-center mb-4 mt-3' variant="primary" type="submit">
               {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
               </div>} Create Course
            </Button>
         </Form>
      </div >
   );
}

export default NewCourse;