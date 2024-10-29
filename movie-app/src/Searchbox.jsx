import React from "react";

const SearchBox=(props)=>{
  const {value,handleSearchbox}= props;
      return (
        <input type="search" name="searchbox" placeholder="Search...." value={value} onChange={handleSearchbox}
        />
      );
}
export default SearchBox;