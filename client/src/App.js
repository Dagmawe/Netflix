import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Show from "./pages/Show";
import "./App.css";
import Movie from "./pages/Movie";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/add" exact Component={Add} />
          <Route path="/shows" exact Component={Show} />
          <Route path="/movies" exact Component={Movie} />
          <Route path="/update" exact Component={Update} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
