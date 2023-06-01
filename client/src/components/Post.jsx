import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2022/06/semi-truck-autonomous-driverless.jpg?w=711"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>
          California lawmakers and AV industry battle for future of self-driving
          trucks
        </h2>
        <p className="info">
          <a href="" className="author">
            Waseem Akram
          </a>
          <time>2023-06-01 12:56</time>
        </p>
        <p className="summary">
          A California bill that would require a trained human safety operator
          to be present any time a heavy-duty autonomous vehicle operates on
          public roads in the state is getting traction.
        </p>
      </div>
    </div>
  );
};

export default Post;
