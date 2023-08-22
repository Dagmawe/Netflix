import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function Add() {
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    rating: "",
    genre: "",
    type: "",
    trailer: "",
  });

  const navigation = useNavigate();

  // handle image upload to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (img === null) {
      return alert("please upload Photo");
    }
    if (
      inputs.title === "" ||
      inputs.rating === "" ||
      inputs.genre === "" ||
      inputs.type === "" ||
      inputs.trailer === ""
    ) {
      return alert("Please complete all input feild");
    }
    try {
      await axios.post("http://localhost:8800", inputs);
      navigation("/");
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  };

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview(null);
    }
  }, [img]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const filename = e.target.files[0].name;
    if (file && file.type.substr(0, 5) === "image") {
      setImg(file);

      const coverName = filename;
      setInputs((prev) => ({ ...prev, ["image"]: coverName }));
      const formdata = new FormData();
      formdata.append("image", file);
      try {
        await axios.post("http://localhost:8800/upload", formdata);
      } catch (err) {
        return console.log(err);
      }
    }
  };

  const handleOnchange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  return (
    <div className="container-main-page">
      <Navbar />
      <div className="pt-20  flex flex-col-2">
        <div className="flex flex-col w-full mt-5">
          <div className="flex flex-row gap-2">
            <label className="text-red-500 text-md mx-5 whitespace-nowrap font-extrabold">
              Movie Title:{" "}
            </label>{" "}
            <input
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              onChange={handleOnchange}
              name="title"
              placeholder="Enter Title..."
              required
            />
          </div>
          <div className="flex flex-row gap-2 ">
            <label className="text-red-500 text-md mx-5 whitespace-nowrap font-extrabold">
              Type of Film
            </label>
            <select
              onChange={handleOnchange}
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="type"
              defaultValue={"placeholder"}
            >
              <option disabled value={"placeholder"}>
                Select
              </option>
              <option>Movie</option>
              <option>Show</option>
            </select>
          </div>
          <div className="flex flex-row gap-2 ">
            <label className="text-red-500 text-md mx-5 whitespace-nowrap font-extrabold">
              Genre of Film
            </label>
            <select
              onChange={handleOnchange}
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={"placeholder"}
              name="genre"
            >
              <option disabled value={"placeholder"}>
                Select
              </option>
              <option>Action</option>
              <option>Comedy</option>
            </select>
          </div>

          <div className="flex felx-row gap-2">
            <label className="text-red-500 text-md mx-5 whitespace-nowrap font-extrabold">
              Film Rating:{" "}
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {inputs.rating}
                </p>
              </div>
            </label>

            <select
              onChange={handleOnchange}
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={"placeholder"}
              name="rating"
            >
              <option disabled value={"placeholder"}>
                Select
              </option>
              <option>0 </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="flex flex-row gap-2">
            <label className="text-red-500 text-md mx-5 whitespace-nowrap font-extrabold">
              Film trailer (URL):{" "}
            </label>
            <input
              required
              type="text"
              name="trailer"
              onChange={handleOnchange}
              placeholder="Enter URL..."
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-max">
            Upload Image
          </label>
          <input
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={handleChange}
            name="image"
            accept="image/*"
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Upload Cover Image
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full w-full">
          {preview && (
            <div className="flex flex-col items-center justify-center h-max w-full">
              <label className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
                Image Preview
              </label>
              <img className="w-max" src={preview} alt="img" />
            </div>
          )}
          <button
            type="button"
            onClick={handleUpload}
            className="mt-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            FINISH
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Add;
