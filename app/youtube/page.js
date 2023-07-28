"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Loading from "../components/Loading/Loading";
import Cookies from "js-cookie";
const page = () => {
  const [channelId, setChannelId] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [googleAuth, setGoogleAuth] = useState();

  useEffect(() => {
    const checkCookie = async () => {
      const res = await fetch(`/api/videos/checkCookie`);
      if (res.ok) {
        setGoogleAuth(true);
      }
    };
    checkCookie();
  }, []);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await fetch(`/api/videos/getVideos/?channelId=${channelId}`);
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.json());
      }
      const data = await res.json();
      setVideos(data?.videos);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsLoading(false);
    }
  };

  const authorizeGoogle = async () => {
    try {
      const client = await fetch(`/api/auth/google`);
      // navigate to the returned URL
      if (!client.ok) {
        throw new Error("Network response was not ok " + client.json());
      }
      const url = await client.json();
      console.log(url);
      window.location.replace(url, "_blank");
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  const generateBlog = async (videoId) => {
    try {
      // Phase 2: Fetching the captcha from the videoId
      const res = await fetch(`/api/videos/getCaptions?videoId=${videoId}`);
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.json());
      }
      const data = await res.json();
      const captcha = data?.captcha;
      alert("Blog generated and saved successfully!");
    } catch (error) {
      console.error("Error generating blog: ", error);
      alert("Error generating blog. Please try again later.");
    }
  };

  return (
    <div className="mt-10">
      <h1>Youtube</h1>
      {!googleAuth && (
        <div>
          <button onClick={authorizeGoogle}>Authorize Google API</button>{" "}
        </div>
      )}
      {googleAuth && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="channelId">Channel ID:</label>
          <input
            id="channelId"
            className=" ms-3 px-4 py-2 border-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Channel ID"
            type="text"
            value={channelId}
            onChange={(event) => setChannelId(event.target.value)}
          />
          <button disabled={!!isLoading} className="block  " type="submit">
            Submit
            {isLoading && <Loading />}
          </button>
        </form>
      )}

      <ul className="mt-10">
        {videos.map((video) => (
          <li
            key={video.id.videoId}
            className="border-3 bg-grey flex-row flex p-3 mb-4"
          >
            <Image
              className="object-cover"
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              width={video.snippet.thumbnails.medium.width / 2}
              height={video.snippet.thumbnails.medium.height / 2}
            />
            <div className="p-4">
              <h4>{video.snippet.title}</h4>
              <p>{dayjs(video.snippet?.publishedAt).format("DD MMMM, YYYY")}</p>
              <button onClick={() => generateBlog(video.id.videoId)}>
                Generate blog
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
