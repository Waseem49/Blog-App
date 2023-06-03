import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  console.log(author);
  return (
    <main>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:5000/` + cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>

          <p className="info">
            <a href="" className="author">
              {author}
            </a>
            <time>{format(new Date(createdAt), `MMM d,yyyy HH:mm`)}</time>
          </p>
          <p className="summary">
            A California bill that would require a trained human safety operator
            to be present any time a heavy-duty autonomous vehicle operates on
            public roads in the state is getting traction.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Post;
