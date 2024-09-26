import React from "react";

const Loginform=()=>{
  return(
  <div className="w-full mt-28">
  <form className="text-2xl font-semibold md:w-3/4 ">
    <lable htmlFor="username" className="block absolute md:left-28 left-10">UserName</lable>
    <input type="text" placeholder="Enter username" autoComplete="current-username" className=" border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-10 w-full "/>
     <small></small>
     <br/>
    <lable htmlFor="password" className="block absolute md:left-28 left-10 mt-10">Password</lable>
    <input type="password" placeholder="Enter password" autoComplete="current-password" className="border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-20 w-full "/>
    <small></small>
    
    <button className="bg-red-900 border-2 border-red-900 rounded md:mt-10 absolute md:left-28 md:p-2 left-10 p-2 mt-40">Submit</button>
  </form>
  </div>
  );
}
export default Loginform;