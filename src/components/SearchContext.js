import { createContext, useState } from "react";

export const SearchContext = createContext();
 const SearchProvider = ({ children }) => { //special prop
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}   {/*  renders whatever was inside <SearchProvider> ... </SearchProvider> */}
    </SearchContext.Provider>
  );
};
export default SearchProvider







