import React, { useEffect, useState } from "react";
import "./cover.css";
import "../../pages/Modal.css";
function Cover({ image, title, vid }) {
  const [movie, setMovie] = useState([]);
  const [modal, setModal] = useState(false);
  const [link, setLink] = useState("");

  function Modal() {
    return (
      <div className="modal">
        <div className="flex flex-col">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${vid}`}
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
  console.log(image);

  return (
    <div style={{ zIndex: 1, position: "relative" }}>
      <div
        className="cover-main"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(http://localhost:8800/images/${image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="cover-contents">
          <h1 className="movie-title">{title}</h1>

          <div style={{ paddingTop: 8 }}>
            <button
              onClick={() => {
                setModal(true);
              }}
              className="btn-play"
            >
              <i className="fa fa-play"></i> Play
            </button>

            <button className="btn-more">
              <i className="fa fa-info-circle"></i> More Info
            </button>
          </div>
        </div>
      </div>
      {/* for faded cover effect */}
      <div className="faded-bottom"></div>
      {modal && <Modal />}
    </div>
  );
}

export default Cover;
