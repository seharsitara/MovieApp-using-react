import React from "react";
import Like from "./Like";


const Moviestable=(props)=>{

  
  

  const {sort,btnHandler,handleSorting}=props;
  return(
    <table className='bg-gray-200	background-color: rgb(229 231 235) max-w-24	max-width: 6rem; /* 96px */ '>
    <thead>
      <tr>
        <th onClick={()=> handleSorting('title')}>Title</th>
        <th onClick={()=> handleSorting('genre.name')}>Genre</th>
        <th onClick={()=> handleSorting('stock')}>Stock</th>
        <th onClick={()=> handleSorting('rating')}>Rate</th>
      </tr>
    </thead>
    <tbody >
    
      
       
        {sort.map((movie)=>(
          <tr key={movie.id} 	 >
            <td className=' m-20	margin: 5rem; /* 80px */ p-3.5	padding: 0.875rem; /* 14px */'>{movie.title} </td>
            <td className=' m-20	margin: 5rem;/* 80px */ padding: 0.875rem; /* 14px */'>{movie.genre.name} </td>
            <td className='  m-20	margin: 5rem; /* 80px */ p-3.5 padding: 0.875rem; /* 14px */'>{movie.stock} </td>
            <td className=' m-20	margin: 5rem; /* 80px */ p-3.5  padding: 0.875rem; /* 14px */'>{movie.rating} </td>
            <td className='  m-20	margin: 5rem; /* 80px */ p-3.5  padding: 0.875rem; /* 14px */'>
              <Like 
              // liked={movie.liked}
               // onClick={()=> likedBtn(movie)}
            >
              </Like>
              </td>
              <td  className= '  m-20	margin: 5rem; /* 80px */ p-3.5 padding: 0.875rem; /* 14px */'>
                <button
                  onClick={()=>  btnHandler(movie)}
                  className='bg-red-700	background-color: rgb(185 28 28) rounded	border-radius: 0.25rem  p-1	padding: 0.25rem '>
                  Delete
                </button>
              </td>
              
            
          </tr>
      )  )}
      
    </tbody>
  </table>
  );
}

export default Moviestable;