import React, { useContext, useState, useEffect } from "react"

const SearchContext = React.createContext()
const SearchUpdateContext = React.createContext()

export function useSearch() {
  return useContext(SearchContext)
}

export function useSearchUpdate() {
  return useContext(SearchUpdateContext)
}


export function SearchProvider({ children }) {
 
  const [currentPerson, setCurrentPerson] = useState()

  function searchUpdate(e) {
    setCurrentPerson(e)
  }

  return (
    <SearchContext.Provider value={currentPerson}>
      <SearchUpdateContext.Provider value={searchUpdate}>
        {children}
      </SearchUpdateContext.Provider>
    </SearchContext.Provider>
  );
} 