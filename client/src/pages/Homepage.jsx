import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";

const Homepage = () => {
  const [posts, setposts] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/users/post").then((res) =>
      res.json().then((data) => {
        // console.log(data);
        setposts(data);
      })
    );
  }, []);
  console.log(posts);
  return (
    <>
      {posts?.map((it) => (
        <Post key={it._id} {...it} />
      ))}
    </>
  );
};

export default Homepage;
