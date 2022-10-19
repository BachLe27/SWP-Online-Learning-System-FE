import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ToastNoti from '../../../components/ToastNoti';
import expertApi from '../../../_actions/expertApi';
import userApi from '../../../_actions/userApi';
import { authAtom, categoriesAtom, toastAtom } from '../../../_state';


const Overall = ({ course }) => {

   const [validated, setValidated] = useState(false);
   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);

   const [categories, setCategories] = useRecoilState(categoriesAtom);

   const loadCategories = async () => {
      try {
         let categoriesData = await (await userApi.getCategories()).data;

         categoriesData = await categoriesData.map(({ id, name }) => ({
            label: name,
            value: id
         }))

         setCategories(categoriesData);

      } catch (error) {
         console.log(error);
      }
   }

   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting }
   } = useForm({
      mode: 'onSubmit',
   });

   useEffect(() => {
      loadCategories();
   }, []);

   useEffect(() => {

   }, [toast])

   const onSubmit = async (data) => {

      console.log(data);
      try {
         const updateCourse = await expertApi.updateCourse(token, course.id, data);
         setToast({
            show: true,
            status: 'primary',
            msg: 'Update course infomation successful!'
         })
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <h3 className="text-primary border-bottom mt-4">Overrall Infomation</h3>
         <Form validated={validated} onSubmit={handleSubmit(onSubmit)} className="p-2">
            <Form.Group className="mb-3" controlId="courseTitle">
               <Form.Label className="fw-semibold">Course title</Form.Label>
               <Form.Control
                  {...register("title", {
                     required: true
                  })}
                  isInvalid={errors.title}
                  type="text" placeholder="Enter course title"
                  defaultValue={course.title}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseCategory">
               <Form.Label className="fw-semibold">Category</Form.Label>
               <Form.Select {...register("category_id", {
                  required: true
               })}>
                  {
                     categories &&
                     categories.map((category, index) => {
                        return <option
                           selected={category.value == course.category_id}
                           value={category.value}
                        >{category.label}</option>
                     })
                  }
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
                  <option selected={course.level === "BEGINNER"} value="BEGINNER">Beginner</option>
                  <option selected={course.level === "INTERMEDIATE"} value="INTERMEDIATE">Intermediate</option>
                  <option selected={course.level === "ADVANCED"} value="ADVANCED">Advanced</option>
               </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseDescription">
               <Form.Label className="fw-semibold">Description</Form.Label>
               <Form.Control
                  {...register("description", {
                     required: true
                  })}
                  isInvalid={errors.description}
                  as="textarea"
                  defaultValue={course.description}
                  placeholder="Enter description for your course..."
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="courseImg">
               <Form.Label className="fw-semibold">Thumbnail Image (URL)</Form.Label>
               <Form.Control
                  isInvalid={errors.image}
                  type="url"
                  placeholder="URL to thumbnail image..."
               />
            </Form.Group>

            <div className="d-flex justify-content-end">
               <Button variant="primary" type="submit">
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Save Changes
               </Button>
            </div>
         </Form>
         <ToastNoti />
      </div>
   )
}

export default Overall