import React from "react";
import { format } from "date-fns";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  console.log(author);
  return (
    <main>
      <div className="post">
        <div className="image">
          <img src={`http://localhost:5000/` + cover} alt="" />
        </div>
        <div className="texts">
          <h2>{title}</h2>
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
