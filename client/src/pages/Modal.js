import React, { useState } from "react";
import "./Modal.css";
function Modal({ link }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="modal">
        <div className="flex flex-col">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <button
            onClick={() => {
              setShow(false);
            }}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Modal;
