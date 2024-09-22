import React from "react";
const Movielist=(props)=>{
const {items,allMovies,genreSelect}=props;
console.log(`itmsss:${items}`)

 

  return(
     
        <ul className="cursor-pointer">
        {items.map((item)=>(
           <li   key={item.id}  className={`p-0.5	padding: 0.125rem ${ genreSelect && genreSelect.id===item.id ?  "bg-slate-600	background-color: rgb(71 85 105)  "
 :" bg-gray-300	--tw-bg-opacity: 1 ; background-color: rgba(209, 213, 219, var(--tw-bg-opacity)"  } `}
 onClick={()=> allMovies(item)} >
          {item.name} 
         
          </li>

        ))}
         
         
          
         
          
       
         
        
        </ul>
      

  );
}

export default Movielist;

