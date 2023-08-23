// import data from "../../data";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch,useSelector} from "react-redux"
import {getSeriesID, deleteSerieId, getSeriesTempCat, addToCartAndSaveDetailsSerie, removeFromCartAndRemoveDetailsSerie, fetchCartContent, todosLosProductosXidUser} from "../../redux/actions";
import ReactPlayer from 'react-player/youtube'
import Swal from 'sweetalert2'
import style from './seriedetail.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";

const SerieDetail = () => {


    const dispatch = useDispatch();
     
    const {id} = useParams()
    const user = localStorage.getItem('email')

    const [temporadaSelect, setTemporadaSelect] = useState(1)
    const [capituloSelect, setCapituloSelect] = useState(1)

    const serie = useSelector(state => state.SerieID);
    const url = useSelector(state => state.UrlSerie);
    const actores = useSelector(state => state.ActoresSeries)
    const generos = useSelector(state => state.generos)
    // const temporada = useSelector(state => state.temporadaSerie)
    // const capitulo = useSelector(state => state.catipuloSerie)
    const tituloepi = useSelector(state => state.tituloEpisodio)
    const cantidadTemporada = useSelector(state => state.cantidadTemporadas)
    const capitulo = useSelector(state => state.cantidadCapitulos)
    const propiedades = {image:serie.image, id:+id, price:serie.price, name:serie.titulo}
    const carrito = useSelector(state => state.carrito)
    const compras = useSelector(state => state.productosComprados)
    const seriesCarrito = carrito.Series
    // const seriesCompradas = compras.series

    const isAddedToCart = seriesCarrito && seriesCarrito.some(producto => producto.seriesXcarro.serieId === +id);
    const seriesCompradas = useSelector(state => state.productosComprados.series)
    const isPurchased = seriesCompradas?.some(producto => producto.id === +id) || false;
    const [serieAgregada, setSerieAgregada] = useState(isAddedToCart)
    console.log(isPurchased)

    const handleclick = () => {
        if (serieAgregada) {
            dispatch(removeFromCartAndRemoveDetailsSerie(id, user));
            setSerieAgregada(false)
            Swal.fire({
                title: `Artículo eliminado del carrito`,
                icon: 'success'
            });
        } else {
            // Producto no en el carrito ni comprado, agregar al carrito
            dispatch(addToCartAndSaveDetailsSerie(propiedades, user));
            setSerieAgregada(true)
            Swal.fire({
                title: `Artículo agregado al carrito`,
                icon: 'success'
            });    
        }
    };
    

 
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    }

    const handleTemporada = (event) => {
        setTemporadaSelect(event.target.value)
    }

    const handleCapitulo = (event) => {
        setCapituloSelect(event.target.value)
    }

    

    useEffect(() => {
        dispatch(getSeriesTempCat(id, temporadaSelect, capituloSelect))
    }, [temporadaSelect, capituloSelect, id])

     useEffect(() => {
        // Cargar los datos iniciales necesarios aquí
        dispatch(getSeriesID(id));
        // Asegurarse de que los datos de Redux se carguen antes de usar isPurchased
        dispatch(fetchCartContent(user));

        return () => {
            dispatch(deleteSerieId());
        }
    }, [id, user]);


    return (
        <section>
             <Navbar isScrolled={isScrolled} /> 
             <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                    <h1 className={style.name}>{serie?.titulo} </h1>
                </div>

                <section className={style.section}>
                <div className={style.image}>
                <img src={serie.image}/>
                </div>
                
                <div className={style.info}>
                    <div className={style.info}>
                        <div>
                            <span>Año de estreno</span>
                            <p>{serie?.yearEstreno}</p>
                        </div>
                        <div>
                            <span>Descripcion</span>
                            <p>{serie?.descripcion}</p>
                        </div>
                        <div>
                            <span>Actores</span>
                            <p>{actores}</p>
                        </div>
                        <div>
                            <span>Generos</span>
                            <p>{generos}</p>
                        </div>
                        <div>
                            <span>Titulo del Episodio</span>
                            <p>{tituloepi}</p>
                        </div>
                    </div>
                </div>
                </section>

                {isPurchased ? ( 
                    null
                ) : (
                    <button
                        className={serieAgregada  ? style.quitar : style.button}// Usa className condicionalmente
                        onClick={handleclick}
                    >
                        {serieAgregada  ? 'Quitar del Carrito' : `$${serie?.price} - Agregar al Carrito`}
                    </button>
                )}
                
            </div>
 
            <div className={style.divContainerTC}>
                <div className={style.divTemp}>
                    <p>TEMPORADA</p>
                    <select className={style.selectDetail} value={temporadaSelect} onChange={handleTemporada}>      
                        {
                            cantidadTemporada?.map((t) => (<option key={t} value={t}>Temporada {t}</option>))
                        }
                    </select>
                </div>
                <div className={style.divCap}>
                    <p >CAPITULO</p>
                    <select className={style.selectDetail} value={capituloSelect} onChange={handleCapitulo}>
                        {
                            capitulo?.map((c) => <option key={c} value={c}>Capitulo {c}</option>)
                        }
                    </select> 
                </div>
            </div>

            <div className={style.divVideo}>
                <ReactPlayer height={500} width={1550} style={{margin:'0 15%',maxWidth:"100%"}} 
                    url={
                        url
                    } controls={true} />
            </div>

            <Footer />
        </section>
    )
}

export default SerieDetail