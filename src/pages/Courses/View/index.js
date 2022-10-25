import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import CategoryRow from './CategoryRow';
import Select from 'react-select'
import userApi from '../../../_actions/userApi';
import { useRecoilState } from 'recoil';
import { categoriesAtom } from '../../../_state';
import Footer from '../../../components/Footer';
import sortByDate from '../../../libs/sortByDate';
import Loading from '../../../components/Loading';
import SearchResult from './SearchResult';

const Courses = () => {

   const [categories, setCategories] = useRecoilState(categoriesAtom);
   const [map, setMap] = useState();
   const [filteredCourses, setFilteredCourses] = useState();
   const [filter, setFilter] = useState();
   const [search, setSearch] = useState(false);
   const [result, setResult] = useState();

   const filterByCategories = (e) => {
      console.log(e.value);
      setFilter(e.value);
   }

   const loadCategories = async () => {
      try {
         let categoriesData = await (await userApi.getCategories()).data;

         categoriesData = categoriesData.map(({ id, name }) => ({
            label: name,
            value: id
         }))
         categoriesData.unshift({ label: 'All Categories', value: '' });

         setCategories(categoriesData);

         let mapCategory = new Map();
         let revert = new Map();

         categoriesData.forEach((category, index) => {
            mapCategory.set(category.value, index);
            revert.set(index, category.label);
         });

         setMap(revert);

         let courses = await (await userApi.getAllCourses()).data;

         courses = sortByDate(courses);

         let filterCourse = [];

         courses.forEach(course => {
            if (course.is_public == false) return;
            if (filterCourse[mapCategory.get(course.category_id)] == undefined)
               filterCourse[mapCategory.get(course.category_id)] = [];
            filterCourse[mapCategory.get(course.category_id)].push(course);
         })

         setFilteredCourses(filterCourse);
         console.log(courses);
      } catch (error) {
         console.log(error);
      }
   }

   const searching = async (e) => {
      const keyword = e.target.value;
      if (keyword != '') {
         setSearch(true);
         try {
            let courseData = await (await userApi.searchCourse(keyword)).data;
            courseData = courseData.filter(course => course.is_public == true);
            setResult(courseData);
         } catch (error) {
            console.log(error);
         }
      } else setSearch(false);

   }

   useEffect(() => {
      loadCategories();
   }, [])

   useEffect(() => {

   }, [filteredCourses, filter, search])

   return (
      <>
         <Navbar />
         <div className='mt-6 container vh-75'>

            <div className="mb-3 d-flex justify-content-center align-items-center flex-column">
               <div className="d-flex align-items-center flex-column">
                  <h2 className='fw-bold text-primary mt-2'>Learning unlimited with us.</h2>
                  <p>Find out your knowledge.</p>
               </div>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column ">
               <form className='col-6 mb-2'>
                  <div class="input-group">
                     <input type="text" autoComplete="off" class="form-control shadow-none" onChange={searching} id="postSearch" placeholder="Search courses..." />
                     <Button variant='secondary' class="input-group-text" type="submit"> <i class="fa-solid fa-magnifying-glass"></i></Button>
                  </div>
               </form>
               {
                  search && <SearchResult result={result} />
               }

            </div>

            <div>
               <div className='mt-4 mb-5'>
                  {
                     !filter && <>
                        <h4 className='fw-semibold text-danger'><i class="fa-solid fa-fire"></i> Top Categories</h4>
                        <div className='col-5 d-flex justify-content-between mt-3'>
                           <Link>Web development</Link>
                           <Link>Business</Link>
                           <Link>Life Style</Link>
                           <Link>Math</Link>
                        </div>
                     </>
                  }

                  <div className='col-5 mt-5'>
                     <h4>Sort by categories</h4>
                     <Select options={categories} onChange={filterByCategories} />
                  </div>
               </div>

               {
                  filteredCourses ?
                     filter ?
                        filteredCourses.map((courses, index) => {
                           return courses[0].category_id == filter ?
                              <CategoryRow name={map.get(index)} key={index} courses={courses} />
                              : <></>
                        }) :
                        filteredCourses.map((courses, index) => {
                           return <CategoryRow name={map.get(index)} key={index} courses={courses} />
                        })
                     : <Loading />
               }

               {/* <CategoryRow />
               <CategoryRow /> */}

            </div>
         </div>
         <Footer />
      </>

   )
}

export default Courses;