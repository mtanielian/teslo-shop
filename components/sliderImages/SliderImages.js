import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './SliderImages.module.css'


const SliderImages = ({ images }) => {
    return (
      <div className="slide-container">
        <Slide>
         {images.map((image, index)=> (
            <div className={styles['each-slide']} key={index}>
              <div style={{'backgroundImage': `url(/products/${image})`}}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default SliderImages