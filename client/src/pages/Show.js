import React, { useEffect, useState } from "react";
import axios from "axios";
import TilesRow from "../components/tilesRow/index.js";
import Navbar from "../components/navbar/index.js";
import Cover from "../components/cover/index.js";

function Show() {
  const [shows, setShows] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [action, setAction] = useState([]);
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [vid, setVid] = useState("");

  useEffect(() => {
    const getShows = async () => {
      try {
        const response_shows = await axios.get(
          "http://localhost:8800/type/Show"
        );
        const response_comedy = await axios.get(
          "http://localhost:8800/shows-page/Comedy/Show"
        );
        const response_Action = await axios.get(
          "http://localhost:8800/shows-page/Action/Show"
        );
        setAction(response_Action.data);
        setComedy(response_comedy.data);
        setShows(response_shows.data);
        setImage(response_shows.data[0].image);
        setVid(response_shows.data[0].trailer.split("v=")[1]);
        setTitle(response_shows.data[0].title);
      } catch (error) {
        console.error(error);
      }
    };
    getShows();
  }, []);
  console.log("show", shows);
  console.log("action", action);
  console.log("comedy", comedy);
  return (
    <div className="container-main-page">
      <Navbar />
      <Cover image={image} title={title} vid={vid} />
      <TilesRow movies={shows} title="Shows" />
      <TilesRow movies={comedy} title="Comedy" />
      <TilesRow movies={action} title="Action" />
    </div>
  );
}

export default Show;
