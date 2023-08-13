import style from './card.module.css'
import { Link } from 'react-router-dom'
import {addToCartAndSaveDetailsSerie} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

const Card = ({id, image, price, name}) => {

  const dispatch = useDispatch()
  const propiedades = {image, id, price , name}
  const user = localStorage.getItem('email')
  
  const handleclick = () => {
    dispatch(addToCartAndSaveDetailsSerie(propiedades, user)) 
}
  return (
    <div className={style.containerMax}>
        <Link to={`/detailSeries/${id}`}>
        <img src={image} alt="Serie Poster" className={style.image}/>
        </Link>
        <button className={style.agg} onClick={handleclick}>${price} - Agregar al Carrito</button>
      </div>
  );
};

export default Card;
