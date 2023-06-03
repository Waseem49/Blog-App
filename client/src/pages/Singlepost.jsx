import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format, formatISO9075 } from "date-fns";
import { userContext } from "../context/usercontext";

const Singlepost = () => {
  const [singleposts, setsingleposts] = useState(null);
  const { id } = useParams();
  const { userinfo } = useContext(userContext);
  console.log(userinfo);

  useEffect(() => {
    fetch(`http://localhost:5000/users/post/${id}`).then((res) =>
      res.json().then((data) => {
        // console.log(data[0]);
        setsingleposts(data[0]);
      })
    );
  }, []);
  console.log(singleposts);
  if (!singleposts) return "";
  return (
    <div className="singlepost">
      <h1>{singleposts?.title}</h1>
      <time>{formatISO9075(new Date())}</time>
      <p className="author">By @{singleposts?.author}</p>

      {userinfo?.username === singleposts?.author && (
        <div className="editdiv">
          <Link className="edit" to={`/edit/${singleposts?._id}`}>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:5000/${singleposts?.cover}`} alt="" />
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: singleposts?.content }}></div>
    </div>
  );
};

export default Singlepost;
