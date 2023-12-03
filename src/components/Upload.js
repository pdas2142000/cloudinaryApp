import React, { useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

function Upload() {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "video_preset"
    );

    try {
      let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = type === "image" ? "image" : "video";
      let api = `https:api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Upload image file
      const imgUrl = await uploadFile("image");

      // Upload video file
      const videoUrl = await uploadFile("video");

      // Send backend api request
      await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/video`, {
        imgUrl,
        videoUrl,
      });

      // Reset states
      setImg(null);
      setVideo(null);

      console.log("File upload success!");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text" className="fs-5">
            Titel:
          </label>
          <input type="text" className="form-control w-25" />
          <br />
          <label htmlFor="text" className=" w-25">
            Description :
          </label>
          <textarea cols="55" rows="5" className="form-control w-25"></textarea>
          <br />
          <label htmlFor="video" className="fs-5">
            Video:
          </label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            className="form-control w-25"
            onChange={(e) => setVideo((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <div>
          <label htmlFor="img" className="fs-5">
            Image:
          </label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            className="form-control w-25"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          Upload
        </button>
      </form>
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </div>
  );
}

export default Upload;
