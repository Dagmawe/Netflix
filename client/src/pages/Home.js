import React, { useEffect, useState } from "react";
import axios from "axios";
import TilesRow from "../components/tilesRow/index.js";
import Navbar from "../components/navbar/index.js";
import Cover from "../components/cover/index.js";

function Home() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [action, setAction] = useState([]);
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [vid, setVid] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response_shows = await axios.get(
          "http://localhost:8800/type/Show"
        );
        const response_movies = await axios.get(
          "http://localhost:8800/type/Movie"
        );
        const response_comedy = await axios.get(
          "http://localhost:8800/genre/Comedy"
        );
        const response_Action = await axios.get(
          "http://localhost:8800/genre/Action"
        );
        setAction(response_Action.data);
        setComedy(response_comedy.data);
        setShows(response_shows.data);
        setMovies(response_movies.data);
        setMovies(response_movies.data);
        setImage(response_movies.data[0].image);
        setVid(response_movies.data[0].trailer.split("v=")[1]);
        setTitle(response_movies.data[0].title);
        console.log("Comedy", comedy);
        console.log("action", action);
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  }, []);
  console.log("vid", vid);
  return (
    <div className="container-main-page">
      <Navbar />
      <Cover image={image} title={title} vid={vid} />
      <TilesRow movies={movies} title="Movies" />
      <TilesRow movies={shows} title="Shows" />
      <TilesRow movies={comedy} title="Comedy" />
      <TilesRow movies={action} title="Action" />
    </div>
  );
}

export default Home;
