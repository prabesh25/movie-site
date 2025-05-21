import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState(""); 
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies");
            } 
                // loding done hudha khari loading off garna ko lagi
            finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

//   const movies = [
//     { id: 1, title: "John Wick", release_date: "2020" },
//     { id: 2, title: "Ddlj", release_date: "1999" },
//     { id: 3, title: "Kabbadi", release_date: "1998" },
//   ];

    const handleSearch = async (e) => {
        e.preventDefault();
        //input empty hudha khari no-search
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
        setError(null); // new request garnu vanda agadi error lai reset garna ko lagi
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
        // setSearchQuery("");
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}      
        </div>
    );
}

export default Home;
