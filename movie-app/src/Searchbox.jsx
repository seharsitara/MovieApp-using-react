import React from "react";

const SearchBox=(props)=>{
  const {value,handleSearchbox}= props;
      return (
        <input type="search" name="searchbox" placeholder="Search...." value={value} onChange={handleSearchbox}
        className="mt-3 w-full p-2 m-auto border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none  text-gray-700"
        />
      );
}
export default SearchBox;