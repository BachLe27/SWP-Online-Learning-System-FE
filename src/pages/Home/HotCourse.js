import Carousel from 'react-bootstrap/Carousel';
import HomeCourse from './HomeCourse';


const HotCourse = () => {
   return (
      <Carousel>
         <Carousel.Item>
            <div class="courses mb-4 row">
               <HomeCourse />
               <HomeCourse />
               <HomeCourse />
               <HomeCourse />
            </div>
         </Carousel.Item>
         <Carousel.Item>
            <div class="courses mb-4 row">
               <HomeCourse />
               <HomeCourse />
               <HomeCourse />
               <HomeCourse />
            </div>
         </Carousel.Item>
         <Carousel.Item>
            <div class="courses mb-4 row">
               <HomeCourse />
               <HomeCourse />
               <HomeCourse />
               <HomeCourse />
            </div>
         </Carousel.Item>
      </Carousel>
   );
}

export default HotCourse;