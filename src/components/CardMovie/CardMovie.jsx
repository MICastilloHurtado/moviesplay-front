import style from './card.module.css'
import { Link } from 'react-router-dom'
import useLocalStorage from '../../useLocalStorage'
// import { updateCartCount, saveId } from '../../redux/actions'
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"

const Card = ({image,id, price}) => {

    const dispatch = useDispatch();
    // const savesId = useSelector(state => state.idSaves)

    // const handleclick = () => {     
    //    if(!savesId.includes(id) ){
    //        dispatch(updateCartCount(1));
    //    }       
    //        dispatch(saveId(id))  
    
    // }

    

    // console.log(savesId)

    return(
        <div className={style.containerMax}>
            <Link to={`/moviesdetail/${id}`}>
            <img src={image} className={style.image}/>
        </Link>
        <button className={style.agg}  >{price} - Agregar al Carrito</button>
        </div>
    )
}

export default Card