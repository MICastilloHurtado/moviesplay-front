import Modal from "../../ModalCreateSerie/ModalCreateSerie"
import ModalEdit from "../../ModalEditSerie/ModalEditSerie"
import ModalEpi from "../../ModalNewEpisodios/ModalNewEpisodios"
import style from './MantenerSeries.module.css'
import { useEffect, useMemo, useState } from "react";
import {SeriesxPage,ActivarDesactivarSeries,getTodoBusqedaAdmSeries,getTodoFillCleanAdm} from "../../../redux/actions"
import { useSearchParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Column,useTable } from "react-table";


const MantenerSeries = ()=> {
 
  
  const dispatch = useDispatch();

  const [openModalSerie,setOpenModalSerie] = useState(false);
  const [openModalSerieEdit,setopenModalSerieEdit] = useState(false);
  const [openModalEpi,setOpenModalEpi] = useState(false);
  const Series = useSelector((state)=> state.Series);
  const numPage = useSelector((state)=> state.numPage);
  const [page,setPage] = useState(numPage);
  const busquedaSer = useSelector((state)=> state.SearchAdmiSerie);
  const busqueda = useSelector((state)=> state.Search);
  const [itemsPage, setItemsPage] = useState([])
  
  const [mostrar,setMostrar] = useState(null);
  
  
  const handleModalSerie = () => {
    setOpenModalSerie(!openModalSerie)
   }

  const handleModalSerieEdit = () => {
    setopenModalSerieEdit(!openModalSerieEdit)
  } 


  const handleModalEpisodio = () => {
    setOpenModalEpi(!openModalEpi)
  }


   const inativar =(row)=> {
    setMostrar(row.id)
    //settempPage(currentPage)
    console.log("Tbmentro");
    console.log("id de pelicula" + row.original.id);
    dispatch(ActivarDesactivarSeries(row.original.id));
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
        
    dispatch(getTodoFillCleanAdm());
    

  }

  const activar = (row)=> {
    console.log("Tbmentro");
    setMostrar(null)
    dispatch(ActivarDesactivarSeries(row.original.id));
    
     dispatch(getTodoBusqedaAdmSeries(busqueda.search));
          
    dispatch(getTodoFillCleanAdm());
      
    
    
  }




   useEffect(()=> {

    dispatch(SeriesxPage(numPage));
    
    dispatch(getTodoFillCleanAdm());
  },[])

   const columns = useMemo(
    ()=>[
      {
        Header: "Nombre",
        accessor: "name"
      },
      { Header: "Imagen",
        accessor: "image" },
      {
        Header: "Precio",
        accessor: "price"},
      { Header: "Accion",
        accessor: "accion",
        Cell: ({row}) => (
          <>
          <button className={style.buttonAccion} onClick={()=> handleModalSerieEdit(row)}>Editar</button>
          {row.original.active == true ? (<button className={style.buttonAccion1} onClick={()=> inativar(row)}>Desactivar</button>):
          (<button className={style.buttonAccion2} onClick={()=> activar(row)}>Activar</button>)}
          </>
        )}
        
    ],[mostrar]
   );

   const tableInstance = useTable({
     columns,
     manualPagination:true
     ,data: busquedaSer.length == 0 ? Series : busquedaSer}

   )

   const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow
   } = tableInstance

   useEffect(()=> {
      dispatch(SeriesxPage(page));
   },[numPage,Series])
  

   
  const handlePreviousPage = () => {  
        
    if (page > 1) {
     //getMovieAndPage(currentPage - 1, null);
     // setCurrentPage(Number(currentPage - 1))
       setPage(page - 1)
    }
  };

  const handleNextPage = () => {
   
      //getMovieAndPage(currentPage + 1, null);
        setPage( page + 1);

  };


       return (
        <div className={style.container}>
          <div className={style.addButtons}>
          <button onClick={handleModalSerie} >Nueva Serie</button>
          <button onClick={handleModalEpisodio}>Agregar Episodios</button>
          </div>
          <Modal  openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></Modal>
          <ModalEdit openModalSerieEdit={openModalSerieEdit} cambiarEstadoSerie={setopenModalSerieEdit}></ModalEdit>   
          <ModalEpi openModalEpi={openModalEpi} cambiarEstado={setOpenModalEpi}></ModalEpi>
          <br/>
          <br/>
          <div>
            <table {...getTableProps()} className={style.table} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{backgroundColor: "red"}}>
                  {headerGroup.headers.map((column)=> (
                    <th {...column.getHeaderProps()}>
                      <div>
                        {column.render('Header')}
                        <br/>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>  
            <tbody {...getTableBodyProps()} className={style.tbody}>
                 {rows.map((row)=> {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className={style.tablerow}>
                        {row.cells.map((cell) => {

                        return(  
                          <td {...cell.getCellProps()} className={style.tablecell}>
                          {cell.column.id == 'image' ? (
                            <img src={cell.value} style={{ maxWidth: '120px', maxHeight: '150px'}}></img>
                          ):(
                            cell.render("Cell")
                            
                          )}
                          
                        </td>
                          )
                          })}
                      </tr>
                    )
                 })}
            </tbody>

            </table>
          </div>
          <div className={style.paginado}>
         <button
              className={style.but}
              onClick={handlePreviousPage}
             // disabled={currentPage === 1}
            >Prev</button>
             {itemsPage.map((item) => 
            <button
            key={item.key}
            className={style.but}
            onClick={() => {
              //setCurrentPage(parseInt(item.key));
              //getMovieAndPage(parseInt(item.key)/*, selectedGenre, selectedPrice, selectedOrder*/);
            }}
          >
            {item.key}
          </button>)}
            <button
              className={style.but}
              onClick={handleNextPage}
              disabled={Series.length < 10}
             // disabled={currentPage === infoPage}
            >Next</button>
           </div >
        </div>
       )

}


export default MantenerSeries;