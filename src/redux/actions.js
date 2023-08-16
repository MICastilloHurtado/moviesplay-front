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
export const SAVE_ID_TO_SAVES = 'SAVE_ID_TO_SAVES'
export const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT'
export const ADD_PRODUCT_DETAILS_MOVIE = 'ADD_PRODUCT_DETAILS_MOVIE'
export const ADD_PRODUCT_DETAILS_SERIE = 'ADD_PRODUCT_DETAILS_SERIE'
export const SAVE_ID_TO_SERIES = 'SAVE_ID_TO_SERIES'
export const BANMOVIE= 'BANMOVIE'
export const REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE = 'REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE'
export const REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE = 'REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE'
const usuario = localStorage.getItem('email')
export const GETSEARCHBARADM = 'GETSEARCHBARADM';
export const GETSEARCHBARCLEANADM = 'GETSEARCHBARCLEANADM';

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
        if(id > 0){
        const detmovie = (await axios.get(`/media/${id}`)).data;
        dispatch({type: GET_MOVIEXID, payload : detmovie })
        }
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

export const addToCart = (emailUsuario, idSerie, idMovie) => async (dispatch, getState )=> {
  try {
    if(!idSerie){
      const response = await axios.post(`/carroCompra?emailUsuario=${emailUsuario}&idMovie=${idMovie}`);
      dispatch({ type: ADD_TO_CART, payload: response.data }); 
      const state = getState();
        const newCartCount = state.cartCount + 1;
        dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
        localStorage.setItem('cartCount', newCartCount);
    }
    if(!idMovie){
      const response = await axios.post(`/carroCompra?emailUsuario=${emailUsuario}&idSerie=${idSerie}`);
      dispatch({ type: ADD_TO_CART, payload: response.data });
      const state = getState();
        const newCartCount = state.cartCount + 1;
        dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
        localStorage.setItem('cartCount', newCartCount);
      
    }
  } catch (error) {
    console.error('Error al agregar al carrito', error);
  }
};



// export const saveIdToSavesMovie = (id) => {
//   return (dispatch, getState) => {
//     const state = getState();
//       const existingId = state.idSavesMovies.find((savedId) => savedId === id);

//       if (!existingId) {
//           const updatedIdSaves = [...state.idSavesMovies, id];
//           localStorage.setItem('idSaves', JSON.stringify(updatedIdSaves));
//           dispatch({
//               type: SAVE_ID_TO_SAVES,
//               payload: updatedIdSaves,
//           });
//       }
//   };
// };

export const addToCartAndSaveDetailsMovie = (productDetails, user) => (dispatch, getState) => {
  // const state = getState();
  // const existingProduct = state.savedProductsMovies.find(product => product.id === productDetails.id);

  // if (!existingProduct) {
    dispatch(addToCart(usuario, null, productDetails.id));
    // dispatch(saveIdToSavesMovie(productDetails.id));

    // const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
    // savedProducts.push(productDetails);
    // localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
    
    dispatch({
      type: ADD_PRODUCT_DETAILS_MOVIE,
      payload: productDetails,
    });

};

// export const saveIdToSavesSerie = (id) => {
//   return (dispatch, getState) => {
//     const state = getState();
//     const existingId = state.idSavesSeries.find((savedId) => savedId === id);
    
//     if (!existingId) {
//       const updatedIdSaves = [...state.idSavesSeries, id];
//       localStorage.setItem('idSavesSeries', JSON.stringify(updatedIdSaves));
//       dispatch({
//         type: SAVE_ID_TO_SERIES,
//         payload: updatedIdSaves,
//       });
//     }
//   };
// };

export const addToCartAndSaveDetailsSerie = (productDetails, user) => (dispatch, getState) => {
  // const state = getState();
  // const existingProduct = state.savedProductsSeries.find(product => product.id === productDetails.id);
  
  // if (!existingProduct) {
    dispatch(addToCart(usuario, productDetails.id, null));
    // dispatch(saveIdToSavesSerie(productDetails.id));
    
    // const savedProducts = JSON.parse(localStorage.getItem('savedSeries')) || [];
    // savedProducts.push(productDetails);
    // localStorage.setItem('savedSeries', JSON.stringify(savedProducts));
    
    dispatch({
      type: ADD_PRODUCT_DETAILS_SERIE,
      payload: productDetails,
    });
  // }
};

export const ActivaroDesactivarMovies = (id)=> {
       return async function (dispatch){
          const banmov = await axios.put(`/admin/disableMovies/${id}`);
          console.log(banmov);
          console.log("vamos")
          dispatch({type: BANMOVIE, payload: banmov})          
       }
}


export const removeFromCart = (emailUsuario, idSerie, idMovie) => async (dispatch, getState )=> {
  try {
    if(!idSerie){
      const response = await axios.delete(`/carroCompra?emailUsuario=${emailUsuario}&idMovie=${idMovie}`);
      dispatch({ type: REMOVE_FROM_CART, payload: response.data });

      // const state = getState();
      // const newCartCount = state.cartCount - 1; 
      // dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
      // localStorage.setItem('cartCount', newCartCount);
      // const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
      // const updatedSavedProducts = savedProducts.filter(product => product.id !== idMovie);
      // if(updatedSavedProducts !== []){
      //   localStorage.removeItem('savedProducts');
      //   const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
      //   localStorage.setItem('savedProducts',JSON.stringify(updatedSavedProducts)) ;
      // }        
    }
    if(!idMovie){
      const response = await axios.delete(`/carroCompra?emailUsuario=${emailUsuario}&idSerie=${idSerie}` );
      dispatch({ type: REMOVE_FROM_CART, payload: response.data }); 
      // const state = getState();
      //   const newCartCount = state.cartCount - 1; 
      //   dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
      //   localStorage.setItem('cartCount', newCartCount);
      //   const savedProducts = JSON.parse(localStorage.getItem('savedSeries')) || [];
      //   const updatedSavedProducts = savedProducts.filter(product => product.id !== idSerie);
      //   if(updatedSavedProducts !== []){
      //     localStorage.removeItem('savedSeries');
      //     const savedProducts = JSON.parse(localStorage.getItem('savedSeries')) || [];
      //     localStorage.setItem('savedSeries',JSON.stringify(updatedSavedProducts)) ;
      //   } 
    }
  } catch (error) {
    console.error('Error al eliminar del carrito', error);
  }
};

//Trae el contenido del carrito de DB
export const fetchCartContent = (email) => async (dispatch) => {
  try {    
    const response = await axios.get(`/carroCompra?emailUsuario=${email}` );
    dispatch({ type: FETCH_CART_CONTENT, payload: response.data.CarroCompra }); 
  } catch (error) {
    console.error('Error al obtener el contenido del carrito', error);
  }
};

export const removeFromCartAndRemoveDetailsMovie = (productId) => async (dispatch) => {
  try {
    await dispatch(removeFromCart(usuario, null, productId));   
    dispatch({
      type: REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE,
      payload: productId,
    });
  } catch (error) {
    console.error('Error al eliminar producto', error);
  }
};

export const removeFromCartAndRemoveDetailsSerie = (productId) => async (dispatch) => {
  try {
    await dispatch(removeFromCart(usuario, productId, null)); 
    
    dispatch({
      type: REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE,
      payload: productId,
    });
  } catch (error) {
    console.error('Error al eliminar producto', error);
  }
};


export const getTodobusquedaAdm = (name)=> {
  console.log(name);
  return async function (dispatch){
      const todoSearchBar = (await axios.get(`/admin/disableMovies?busqueda=${name}`)).data.elementos;
      dispatch({type: GETSEARCHBARADM, payload: todoSearchBar})
  }
}


export const getTodoFillCleanAdm = ()=> {
  return function (dispatch){
    dispatch({type:GETSEARCHBARCLEANADM,payload: []})
  }
}

export const ActualizarMovie = (id,form)=> {
  return async function  (dispatch){
    const ActMov = await axios.put(`/admin/updateMovies/${id}`,form) ;
    dispatch({type:ActMov,payload:actions.payload})

  }


}

