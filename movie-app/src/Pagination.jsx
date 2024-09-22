import _ from 'lodash';
import React from 'react';
const pagination=(props)=>{

  





  const  {movieCount,pageCount,currentPage}=props;
  
  console.log(`page: ${currentPage}`);
  console.log(movieCount)
  const btnCount= Math.ceil(movieCount/pageCount);
  if(btnCount===1) return null;
  const noOnBtn=_.range(1, btnCount + 1);
   console.log(`buttons : ${noOnBtn}`)

    



  return(
    
    <ul className='flex  items-center  justify-center w-32	width: 8rem  h-16	height: 4rem	position: relative left-20	left: 5rem max-w-xs	max-width: 20rem;'>
      {noOnBtn.map((page)=>(
         <li  key={page} className={`text-4xl	font-size: 2.25rem line-height: 2.5rem  p-2	padding: 0.5rem line-height: 2.5rem rounded	border-radius: 0.25rem my-1 bg-red-700	background-color: rgb(185 28 28)  ${currentPage===page ?  "bg-red-950	background-color: rgb(69 10 10)": " bg-red-700	background-color: rgb(185 28 28) " }` }> <a href="#"   onClick={()=>  props.onPageChange(page)}   >{page}</a>
         </li>
     ) )}
      
    
    
      
    </ul>
    
  );
}

export default pagination;