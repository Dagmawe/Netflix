import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import NetflixLogo from "../../assets/svgs/netflix-icon.svg";
import ProfileIcon from "../../assets/svgs/profile-icon-4.svg";
import routes from "../../utils/routes";
import "../../pages/Modal.css";
import useWindowSize from "../../utils/hooks/useWindowSize";

function Navbar({ movies }) {
  const screenSize = useWindowSize();
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState([]);
  const [modal, setModal] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    // Access input value
    const query = event.target.value;
    setSearchInput(event.target.value);
    // Create copy of item list
    let updatedList = [...movies];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilter(updatedList);
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
    <div className={`container-navbar ${offset > 30 && `after-scroll`}`}>
      <div className="inner-container">
        <img className="netflix-logo" src={NetflixLogo} />
        {/* {screenSize.width > 640
          ? arrOptions.map((element, index) => (
              <h5
              key={element.id}
                style={{
                  paddingLeft: 16,
                  color: index == 0 ? "white" : "#B6B5B6",
                }}
              >
                {element.title}
              </h5>
            ))
          : null} */}
        <h5
          style={{
            paddingLeft: 16,
            color: "white",
          }}
        >
          <Link to="/"> Home</Link>
        </h5>
        <h5
          style={{
            paddingLeft: 16,
            color: "white",
          }}
        >
          <Link to="/movies">Movies</Link>
        </h5>
        <h5
          style={{
            paddingLeft: 16,
            color: "white",
          }}
        >
          <Link to="/shows">TV Shows</Link>
        </h5>
      </div>

      <div className="inner-container">
        <div style={{ color: "#fff", fontSize: 20 }}>
          {search ? (
            <div className="flex flex-col">
              <div className="flex relative flex mx-5">
                <span
                  onClick={() => {
                    setSearch(!search);
                  }}
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  onChange={handleChange}
                  value={searchInput}
                  type="search"
                  className=" mx-2 block w-max  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600  dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search Title, Genre..."
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
              </div>
              <div>
                {filter.length > 0 ? (
                  <div className="absolute w-max h-auto overflow-hidden p-6 mt-5 bg-transparent border rounded-lg">
                    {filter.map((movie) => {
                      return (
                        <div
                          className="flex flex-row w-30 gap-2 justify-start p-2 rounded mb-2 hover:scale-110 border"
                          key={movie.id}
                          onClick={() => {
                            if (movie.trailer) {
                              setLink(movie.trailer.split("v=")[1]);
                              console.log("link", link);
                              setModal(!modal);
                            }
                          }}
                        >
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 10 16"
                          >
                            <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                          </svg>
                          <img
                            key={movie.id}
                            className="h-5 w-5"
                            src={`http://localhost:8800/images/` + movie.image}
                            alt={movie.title}
                          />
                          <ul key={movie.id}> {movie.title}</ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="absolute w-max h-25 overflow-hidden p-6 mt-5 bg-transparent border rounded-lg">
                    No results
                  </div>
                )}
              </div>
            </div>
          ) : (
            <span
              onClick={() => {
                setSearch(!search);
              }}
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          )}
        </div>
        <h5 style={{ paddingLeft: 16, color: "#fff" }}>
          <Link to="/add">
            <svg
              data-name="Layer 1"
              id="Layer_1"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <path d="M23.33,6.67v-2A2.67,2.67,0,0,0,20.67,2h-16A2.68,2.68,0,0,0,2,4.67v16a2.67,2.67,0,0,0,2.67,2.66h2V10.67a4,4,0,0,1,4-4Z" />
              <path d="M28,8.67H10.67a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10.67A2,2,0,0,0,28,8.67ZM24.67,20.33H20.33v4.34a1,1,0,0,1-2,0V20.33H14a1,1,0,0,1-1-1,1,1,0,0,1,.1-.43l.47-.47a1,1,0,0,1,.43-.1h4.33V14a1,1,0,0,1,.1-.43l.47-.47a1,1,0,0,1,.43-.1,1,1,0,0,1,1,1v4.33h4.34a1,1,0,0,1,0,2Z" />
            </svg>
          </Link>
        </h5>
        <div style={{ color: "#fff", fontSize: 20, paddingLeft: 16 }}>
          <i className="fa fa-bell"></i>
        </div>
        {/* <img onClick={navigateToProfile} width={40} style={{ objectFit: 'contain', borderRadius: 6, marginLeft: 16 }} src={selectedProfile.asset} /> */}
        <div style={{ color: "#fff", fontSize: 20, paddingLeft: 16 }}>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
      {modal && <Modal link={link} />}
    </div>
  );
}

export default Navbar;
