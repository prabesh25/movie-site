//create-context global context create garna ko lagi
import {createContext, useState, useEffect, useContext } from "react"

const MovieContext = createContext()

// movieContext lai use garya any-where data access garna ko lagi 
export const useMovieContext = () => useContext(MovieContext)

//wrapper vai halyo : access dina movie context lai 
export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState([])  

  useEffect(() => {
      // local storage ma cha vani set garcha

    const storedFavs = localStorage.getItem("favorites")
    if(storedFavs) setFavorites(JSON.parse(storedFavs))
  },[])

  useEffect(() => {
    // updated favourites lai local storage ma save garna ko lagi
     localStorage.setItem('favorites', JSON.stringify(favorites))
  },[favorites])

  const addToFavorites = (movie) => {
    setFavorites(prev => [...prev, movie])
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }


  return <MovieContext.Provider value={value}>
    {children}
  </MovieContext.Provider>   
}





