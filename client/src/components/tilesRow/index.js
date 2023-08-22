import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./tilesrow.css";
import "../../pages/Modal.css";
// import Modal from "../../pages/Modal";
export default function TilesRow({ movies, title }) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [link, setLink] = useState("");

  const handleClick = () => {
    setHover(!hover);
  };
  const handleOnhover = (e) => {
    console.log(e);
  };
  function Modal({ link }) {
    return (
      <div className="modal">
        <div className="flex flex-col">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${link}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <button
            onClick={() => {
              setModal(!modal);
            }}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="row-container">
      <div className="flex flex-row gap-2">
        <h2 className="row-title">{title}</h2>
        <div onClick={handleClick}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z" />
          </svg>
        </div>
      </div>
      <div className="tiles-row-container">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => {
                setModal(true);
                if (movie.trailer) {
                  setLink(movie.trailer.split("v=")[1]);
                } else {
                  alert("Try again");
                }
              }}
              key={movie.id}
              className="image-tile-top-row"
              src={`http://localhost:8800/images/` + movie.image}
              alt={movie.title}
            />
          );
        })}
      </div>
      {modal && <Modal link={link} />}
    </div>
  );
}
