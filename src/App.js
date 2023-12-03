import { Link, Outlet } from "react-router-dom";
import Note from "./components/Note";

function App() {
  return (
    <div className="App m-4">
      <h1 className="mb-4">
        Upload files useing Cloudinary Services in MERN stack project
      </h1>
      <Note />
      <Link to="/" className="mx-4">
        <button className="btn btn-success">Home</button>
      </Link>
      <Link to="upload">
        <button className="btn btn-success me-4">Upload</button>
      </Link>
      <Link to="gallery">
        <button className="btn btn-success">Gallery</button>
      </Link>
      <br />
      <br />
      <Outlet />
    </div>
  );
}

export default App;
