import React from "react";
import { useParams,useNavigate } from "react-router-dom";

const Movieform=()=>{
  const navigate=useNavigate();
  const {id}=useParams();


  const backBtn=()=>{
    navigate("/movies");
  }

      return (
        <>
      <h1>Movie Form</h1>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique molestias qui, ipsam iure soluta quis dolorum nesciunt sunt animi debitis ratione veritatis enim atque, impedit, natus laborum eveniet minus officiis! - {id}</h1>
      <button onClick={backBtn}>Back</button>
      </>
    );
}
export default Movieform;