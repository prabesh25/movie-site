import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Home from "./pages/Home.jsx";
import {Routes, Route} from "react-router-dom"
// import Favorite from "./pages/Favourites.jsx";
// import Favorite from "./pages/Favourites.jsx";
import Favorites from "./pages/Favourites.jsx";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar.jsx"

function App() {
  // const movieNumber = 1;

  return (
    // <div>
    //   {/* {movieNumber === 1 ? (
    //     <MovieCard
    //       movie={{ title: "wonder Film", release_date: "2025" }}
    //     ></MovieCard>
    //   ) : (
    //     <MovieCard
    //       movie={{ title: "prabesh's Film", release_date: "2025" }}
    //     ></MovieCard>
    //   )} */}
    //   {/* {movieNumber === 1 && (
    //     <MovieCard
    //       movie={{ title: "wonders Film", release_date: "2025" }}
    //     ></MovieCard>
    //   )} */}
    //   <Home />
    // </div>
    <MovieProvider>
      <NavBar/>
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </main>
    </MovieProvider>
    
  );
}

export default App;
