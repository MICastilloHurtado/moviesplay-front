import axios from "axios";
import Swal from 'sweetalert2'

export const GET_GENEROS = "GET_GENEROS";
export const GET_MEDIA = "GET_MEDIA";
export const GET_TODO = "GET_TODO";
export const POST_MOVIE = "POST_MOVIE";
export const GET_MOVIEXID = "GET_MOVIEXID";
export const GETSEARCHBAR = "GETSEARCHBAR";
export const GETSEARCHBARCLEAN = "GETSEARCHBARCLEAN";
export const GET_SERIES_ID = "GET_SERIES_ID";
export const GET_SERIES = "GET_SERIES"
export const POST_SERIE = "POST_SERIE";
export const CLEAR_MOVIE_ID = "CLEAR_MOVIE_ID";
export const DELETE_SERIE_ID = 'DELETE_SERIE_ID'
export const ACCESO = 'ACCESO'
export const BLOQUEAR_ACCESO = 'BLOQUEAR_ACCESO'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const FETCH_CART_CONTENT = 'FETCH_CART_CONTENT'
export const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT'

export const getGeneros = ()=> {
   return async function (dispatch){
     const {data} = await axios.get("/genres");
     const generos = data
     dispatch({type: GET_GENEROS, payload : generos})
   }
   

}

export const getMovies = ()=> {
    return async function (dispatch){
        const movie = await axios.get("/media");
       
        dispatch({type:GET_MEDIA, payload : movie})
    }
}

export const getTodo = ()=> {
    return async function (dispatch){
        const todo = (await axios.get("/media/todo")).data.elementos;
        dispatch({type: GET_TODO, payload: todo})
    }
}

export const getTodobusqueda = (name)=> {
    console.log(name);
    return async function (dispatch){
        const todoSearchBar = (await axios.get(`/media/todo?busqueda=${name}`)).data.elementos;
        dispatch({type: GETSEARCHBAR, payload: todoSearchBar})
    }
}

export const postMovie = (mov) => {
    return async function (dispatch){
      
    try{  
      
      const newMovie = await axios.post("/media",mov);
      dispatch({type: POST_MOVIE,payload: newMovie})
      Swal.fire({
        title:`La Pelicula se Creo con Exito`,
          icon:'success',
          confirmButtonText:'Ok'});

    }catch(error){
      console.log(error);
      Swal.fire({
        title:`${error.response.data.error}`,
          icon:'error',
          confirmButtonText:'Ok'});

    }    
}}

export const getMoviexid = (id)=> {
      return async function (dispatch){
        const detmovie = (await axios.get(`/media/${id}`)).data;
        dispatch({type: GET_MOVIEXID, payload : detmovie })
      }
}
export const getTodoFillClean = ()=> {
       return function (dispatch){
         dispatch({type:GETSEARCHBARCLEAN,payload: []})
       }
}

export const getSeries = ()=> {
  return async function (dispatch){
      const series = (await axios.get("/media/series")).data.elementos;
      
      dispatch({type: GET_SERIES, payload : series})
  }
}


export const postSerie =(Serie)=>{
    return async function (dispatch){

        try {
            
        const PostSerie = await axios.post(`/series/series`,Serie);
        dispatch({type: POST_SERIE,payload: PostSerie});
          Swal.fire({
          title:`La Serie se Creo con Exito`,
           icon:'success',
           confirmButtonText:'Ok'});
           
        }catch(error){
          
          console.log("mal"); 
          Swal.fire({
            title:`${error.response.data.error}`,
             icon:'error',
             confirmButtonText:'Ok'});
  
        }    
        
    }
} 

export const clearMovieId = () => {
  return { type: CLEAR_MOVIE_ID };
};

export const getSeriesID = (id, temp, capit)=> {
  return async function (dispatch){
    const seriesId = (await axios.get(`/media/series/${id}`)).data;

    // Utilizamos un objeto para almacenar las temporadas únicas
    const temporadasUnicas = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      temporadasUnicas[episodio.numTemporada] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadTemporadas = Object.keys(temporadasUnicas).length;
    const arregloTemporada = [];
    for (let i = 1; i <= cantidadTemporadas; i++) {
      arregloTemporada.push(i);
    }
    // Utilizamos un objeto para almacenar los capitulos únicas
    const capitulosUnicos = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      capitulosUnicos[episodio.numEpisodio] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadCapitulo = Object.keys(capitulosUnicos).length;
    const arregloCapitulo = [];
    for (let i = 1; i <= cantidadCapitulo; i++) {
      arregloCapitulo.push(i);
    }

    // Muestro la temporada 1 y capitulo 1
    const linkS = seriesId.Episodios[0].linkVideo
    const actores = seriesId.actores.map((a) => a).join(', ')
    const genero = seriesId.Genres.map((a) => a.name).join(', ')
    const temporada = seriesId.Episodios[0].numTemporada
    const capitulo = seriesId.Episodios[0].numEpisodio
    const tituloEpisodio = seriesId.Episodios[0].tituloEpisodio

    dispatch(
      {
        type: GET_SERIES_ID, 
        payload: {series: seriesId, link: linkS, actoresP: actores, generos: genero, temp: temporada, catp: capitulo, tituloEpi: tituloEpisodio, cantidadTemporadas: arregloTemporada, cantidadCapitulos: arregloCapitulo}
      }
    )
  }
}


export const getSeriesTempCat = (id, temp, capit)=> {
  return async function (dispatch){
    const seriesId = (await axios.get(`/media/series/${id}`)).data;

    // Utilizamos un objeto para almacenar las temporadas únicas
    const temporadasUnicas = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      temporadasUnicas[episodio.numTemporada] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadTemporadas = Object.keys(temporadasUnicas).length;
    const arregloTemporada = [];
    for (let i = 1; i <= cantidadTemporadas; i++) {
      arregloTemporada.push(i);
    }
    // Utilizamos un objeto para almacenar los capitulos únicas
    const capitulosUnicos = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      capitulosUnicos[episodio.numEpisodio] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadCapitulo = Object.keys(capitulosUnicos).length;
    const arregloCapitulo = [];
    for (let i = 1; i <= cantidadCapitulo; i++) {
      arregloCapitulo.push(i);
    }

    let filter = seriesId.Episodios.filter((episodio) => episodio.numTemporada == temp && episodio.numEpisodio == capit)

    // Muestro la temporada 1 y capitulo 1
    const linkS = filter[0].linkVideo
    const actores = seriesId.actores.map((a) => a).join(', ')
    const genero = seriesId.Genres.map((a) => a.name).join(', ')
    const temporada = filter[0].numTemporada
    const capitulo = filter[0].numEpisodio
    const tituloEpisodio = filter[0].tituloEpisodio

    dispatch(
      {
        type: GET_SERIES_ID, 
        payload: {series: seriesId, link: linkS, actoresP: actores, generos: genero, temp: temporada, catp: capitulo, tituloEpi: tituloEpisodio, cantidadTemporadas: arregloTemporada, cantidadCapitulos: arregloCapitulo}
      }
    )
  }
}

export function deleteSerieId() {
  return {
      type: DELETE_SERIE_ID 
  }
}


export const acceso = (boolian) => {
  return function accesoBoolian(dispatch){

    dispatch({
      type: ACCESO,
      payload: boolian
    })
  }
}

export const bloquearAcceso = () => {
  return {
    type: BLOQUEAR_ACCESO
  }
}

export const addToCart = (emailUsuario, idSerie, idMovie) => async dispatch => {
  try {
    if(!idSerie){
      const response = await axios.post('/carroCompra', { emailUsuario, idMovie });
      dispatch({ type: ADD_TO_CART, payload: response.data }); 
    }else{
      const response = await axios.post('/carroCompra', { emailUsuario, idSerie });
      dispatch({ type: ADD_TO_CART, payload: response.data }); 
    }
  } catch (error) {
    console.error('Error al agregar al carrito', error);
  }
};

export const removeFromCart = (emailUsuario, idSerie, idMovie) => async dispatch => {
  console.log(emailUsuario)
  try {
    if(!idSerie){
      const response = await axios.delete(`/carroCompra?emailUsuario=${email}&idMovie=${idMovie}` );
      dispatch({ type: REMOVE_FROM_CART, payload: response.data }); 
    }else{
      const response = await axios.delete(`/carroCompra?emailUsuario=${email}&idMovie=${idSerie}` );
      dispatch({ type: REMOVE_FROM_CART, payload: response.data }); 
    }
  } catch (error) {
    console.error('Error al eliminar del carrito', error);
  }
};

export const fetchCartContent = (email) => async (dispatch) => {
  try {    
    const response = await axios.get(`/carroCompra?emailUsuario=${email}` );
    dispatch({ type: FETCH_CART_CONTENT, payload: response.data.CarroCompra }); 
  } catch (error) {
    console.error('Error al obtener el contenido del carrito', error);
  }
};

export const updateCartCount = (id) => {
  return (dispatch, getState) => {
      const state = getState();
      const existingMovie = state.idSaves.find((savedId) => savedId === id);

      if (existingMovie) {
          // No se actualiza el carrito si la película ya existe en idSaves
          return;
      } else {
          const newCartCount = state.countCar + 1; // Incrementar el contador en 1
          localStorage.setItem('cartCount', newCartCount);
          dispatch({
              type: UPDATE_CART_COUNT,
              payload: id,
          });
      }
  };
};
