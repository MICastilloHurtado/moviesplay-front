import {GET_GENEROS,GET_MEDIA,GET_TODO,POST_MOVIE,GET_MOVIEXID, GET_SERIES, GET_SERIES_PAGE, GET_GENEROS_SERIES,GETSEARCHBAR,GETSEARCHBARCLEAN} from "./actions"

const initialState = {
     Generos: [],
     Media:[],
     Todo:[],
     TodoFill:[],
     NewMovie:[],
     MovieId:[],
     Series: []
}

const rootReducer =(state = initialState,action)=> {
 
    switch(action.type){

        case GET_GENEROS:
            return {...state, Generos:action.payload}

        case GET_MEDIA:
            return {...state, Media: action.payload}   
            
        case GET_TODO:
            return {...state, Todo: action.payload}

        case POST_MOVIE:
            return {...state, NewMovie : action.payload}     
        case GET_MOVIEXID:
            return {...state, MovieId:action.payload}
        
        case GET_SERIES:
            return {
                ...state,
                Series: action.payload
            }

        case GET_SERIES_PAGE: 
            return {
                ...state,
                Series: action.payload
            }

        case GET_GENEROS_SERIES: 
            return {
                ...state,
                Series: action.payload
            }
        
        case GETSEARCHBAR:
            return {...state, TodoFill: action.payload}
        case GETSEARCHBARCLEAN:
            return {...state, TodoFill: action.payload}    
        default:
            return {...state}
    }

}


export default rootReducer;