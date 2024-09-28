import React from "react";
import { useState} from "react";
import Joi from "joi";


const Register=()=>{
  const [data,setData]=useState({
    username:'',
    password:'',
    email:''
});
const [errors,setErrors]=useState({

});


const schema= Joi.object({
username: Joi.string().min(3).required().label('Username'),
password: Joi.string().min(6).required().label('Password'),
email: Joi.string().email({ tlds: { allow: false } }).required().label('Email')
})

    const onChangeHandler=(e)=>{
     const {name,value}=e.target;

     setData({
     ...data,
     [name]:value
    });

   const { error } = schema.extract(name).validate(value);
   setErrors({ ...errors, [name]: error ? error.details[0].message : null });

}




const handleSubmit=(e)=>{
e.preventDefault();
const validation=schema.validate(data);

    if (validation.error) {
 const errorMessages = {};
 validation.error.details.forEach(detail => {
   errorMessages[detail.path[0]] = detail.message; // Add errors
 });
 setErrors(errorMessages); // Show errors
 return; // Stop submission



}

}

    const isFormValid = Object.keys(errors).length === 0 && Object.keys(data).every(key => data[key] !== '');




      return (
       <>
       

       <div className="w-full mt-16">
       <h1 className="md:text-5xl md:font-bold text-4xl font-bold mb-10 w-fit md:ml-20 text-red-900">Register</h1>
  <form className="text-2xl font-semibold md:w-3/4 " onSubmit={handleSubmit}>
    <label htmlFor="username" className="block absolute md:left-28 left-10">UserName</label>
    <input  type="text" id="username" name="username" value={data.username} onChange={onChangeHandler} autoComplete="current-username" className=" border-2 border-black       rounded md:p-3 p-2 md:w-full md:ml-20 mt-10 w-full focus:border-blue-500 
     focus:outline-none  focus:bg-blue-50" autoFocus/>
    {errors.username && (<span  className={`${errors.username.includes('correct') ?  'bg-green-200 ': 'bg-red-200 ' }font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full`}>{errors.username}</span>)
    }
     <br/>
    <label htmlFor="password" className="block absolute md:left-28 left-10 mt-10">Password</label>
    <input type="password" id="password" name="password" value={data.password} onChange={onChangeHandler}  autoComplete="current-password" className="border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-20 w-full focus:border-blue-500 
     focus:outline-none  focus:bg-blue-50 " autoFocus/>
    {errors.password && (<span  className={`font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full ${errors.password.includes('correct') ?  'bg-green-200 ': 'bg-red-200 '}`}>{errors.password}</span>)
    }
    <br/>
    <label htmlFor="email" className="block absolute md:left-28 left-10 mt-10">Email</label>
    <input type="email" id="email" name="email" value={data.email} onChange={onChangeHandler}  autoComplete="current-email" className="border-2 border-black rounded md:p-3 p-2 md:w-full md:ml-20 mt-20 w-full focus:border-blue-500 
     focus:outline-none  focus:bg-blue-50 " autoFocus/>
    {errors.email && (<span  className={`font-medium text-base p-2 rounded inline-block md:w-full md:ml-20  w-full ${errors.email.includes('correct') ?  'bg-green-200 ': 'bg-red-200 '}`}>{errors.email}</span>)
    }
    
    <button className={` border-2 border-red-900 rounded md:mt-10 absolute md:left-32 md:p-2 left-10 p-2 mt-40 ${!isFormValid ? "bg-red-400" : "bg-red-900" }`} disabled={!isFormValid} >Register</button>
  </form>
  </div>



       </>
      
    
    );
}
export default Register;