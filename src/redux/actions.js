import axios from "axios";

export const GET_GENEROS = "GET_GENEROS";
export const GET_MEDIA = "GET_MEDIA";
export const GET_TODO = "GET_TODO";
export const POST_MOVIE = "POST_MOVIE";
export const GET_MOVIEXID = "GET_MOVIEXID";
export const GETSEARCHBAR = "GETSEARCHBAR";
export const GETSEARCHBARCLEAN = "GETSEARCHBARCLEAN";
export const GET_SERIES_ID = "GET_SERIES_ID";
export const GET_SERIES = "GET_SERIES"
// export const GET_SERIES_PAGE = "GET_SERIES_PAGE";
// export const GET_GENEROS_SERIES = "GET_GENEROS_SERIES";
export const POST_SERIE = "POST_SERIE";
export const DELETE_SERIE_ID = 'DELETE_SERIE_ID'

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
       // console.log(movie);
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
        console.log(todoSearchBar);
        dispatch({type: GETSEARCHBAR, payload: todoSearchBar})
    }
}

export const postMovie = (mov) => {
     return async function (dispatch){
        const newMovie = await axios.post("/media",mov);
        if(newMovie){
           dispatch({type: POST_MOVIE,payload: newMovie})
           Swal.fire({
            title:`La pelicula se creo con exito`,
             icon:'success',
             confirmButtonText:'Ok'});
        }else{
          Swal.fire({
            title:`Ocurrio un error`,
             icon:'error',
             confirmButtonText:'Ok'});
        }
     }
}

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
      // console.log(series)
      dispatch({type: GET_SERIES, payload : series})
  }
}

// export const getSeriesPage = (page)=> {
//   return async function (dispatch){
//       const seriesPage = (await axios.get(`/media/series?page=${page}`)).data.elementos;
//       dispatch({type: GET_SERIES_PAGE, payload : seriesPage})
//   }
// }

// export const getGenerosSeries = (gen)=> {
//   return async function (dispatch){
//       const generosSeries = (await axios.get(`/media/series?genre=${gen}`)).data.elementos;
//       // console.log(generosSeries)
//       dispatch({type: GET_GENEROS_SERIES, payload: generosSeries})
//   }
// }

export const postSerie =(Serie)=>{
    return async function (dispatch){
        const PostSerie = await axios.post(`/series/series`,Serie);
        console.log(PostSerie);
        dispatch({type: POST_SERIE,payload: PostSerie});
    }
} 

export const getSeriesID = (id)=> {
  return async function (dispatch){
      const seriesId = (await axios.get(`/media/series/${id}`)).data;
      const linkS = seriesId.Episodios[0].linkVideo
      const actores = seriesId.actores.map((a) => a).join(', ')
      const genero = seriesId.Genres.map((a) => a.name).join(', ')
      const temporada = seriesId.Episodios[0].numTemporada
      const capitulo = seriesId.Episodios[0].numEpisodio
      const tituloEpisodio = seriesId.Episodios[0].tituloEpisodio
      console.log(tituloEpisodio)
      dispatch(
        {
          type: GET_SERIES_ID, 
          payload: {series: seriesId, link: linkS, actoresP: actores, generos: genero, temp: temporada, catp: capitulo, tituloEpi: tituloEpisodio}
          // payload: {series: seriesId, actoresP: actores, generos: genero, temp: temporada, catp: capitulo, tituloEpi: tituloEpisodio}
        }
      )
  }
}

export function deleteSerieId() {
  return {
      type: DELETE_SERIE_ID
  }
}