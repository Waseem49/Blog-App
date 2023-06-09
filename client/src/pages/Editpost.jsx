import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Editpost = () => {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState("");

  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/users/post/${id}`).then((res) =>
      res.json().then((data) => {
        console.log(data[0]);
        settitle(data[0].title);
        setsummary(data[0].summary);
        setcontent(data[0].content);
      })
    );
  }, []);

  const updatepost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/users/post/${id}`, {
      method: "PATCH",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setredirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${+id}`} />;
  }
  return (
    <div>
      {" "}
      <form onSubmit={updatepost}>
        <input
          type="title"
          placeholder="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="summary"
          value={summary}
          onChange={(e) => setsummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setfiles(e.target.files)} />
        <ReactQuill
          value={content}
          onChange={(newvalue) => setcontent(newvalue)}
          modules={modules}
          formats={formats}
        />
        <button>Update Post</button>
      </form>
    </div>
  );
};

export default Editpost;
