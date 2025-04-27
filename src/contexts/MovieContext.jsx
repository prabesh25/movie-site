
import {createContext, useState, useEffect, useContext } from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState([])  

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites")
    
    if(storedFavs) setFavorites(JSON.parse(storedFavs))
  },[])

  useEffect(() => {
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



// // 1. Store a simple value
// localStorage.setItem("username", "Prabesh");

// // 2. Retrieve the value
// let username = localStorage.getItem("username");
// console.log("Username:", username); // Output: "Username: Prabesh"

// // 3. Store an object (convert to JSON)
// let user = { name: "Prabesh", age: 20 };
// localStorage.setItem("user", JSON.stringify(user));

// // 4. Retrieve the object (parse JSON back)
// let storedUser = JSON.parse(localStorage.getItem("user"));
// console.log("User Object:", storedUser); // Output: { name: "Prabesh", age: 20 }
// console.log("User Name:", storedUser.name); // Output: "Prabesh"

// // 5. Remove a single item
// localStorage.removeItem("username");

// // 6. Clear all localStorage data
// localStorage.clear();








