import Carousel from 'react-bootstrap/Carousel';
const Slider = () => {

   const sliderImgStyle = {
      minHeight: "100%",
      background: "url('https://picsum.photos/800/300') rgba(255, 0, 150, 0.3)",
      backgroundSize: "over",
      backgroundBlendMode: "multiply"
   }


   return (
      <Carousel>
         <Carousel.Item>
            <img
               className="d-block w-100"
               src="https://picsum.photos/800/300"
               alt="First slide"
            />
            <Carousel.Caption>
               <h3>First slide label</h3>
               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100"
               src="https://picsum.photos/800/300"
               alt="Second slide"
            />

            <Carousel.Caption>
               <h3>Second slide label</h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100"
               src="https://picsum.photos/800/300"
               alt="Third slide"
            />

            <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
               </p>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>
   );
}

export default Slider;