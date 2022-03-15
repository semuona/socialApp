import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SocialAppContext } from "../Context";
import Modal from "../Modal/Modal";
export default function Profile() {
  const { users, posts, setPosts, setUsers, loggedInUser, setLoggedInUser } =
    useContext(SocialAppContext);

  // States
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [blobFile, setBlobFile] = useState(null);

  const data = {
    owner: loggedInUser?._id,
    description: text,
    image: fileUrl,
  };

  const handleSave = async () => {
    const formdata = new FormData();

    Object.entries(data).forEach((item) => formdata.set(item[0], item[1]));

    if (blobFile) formdata.set("image", blobFile, "somefilename"); // add a file and a name

    const config = {
      headers: { "content-type": "mulitpart/form-data" },
    };

    console.log("Home: handleSave: data is", data);
    const response = await axios.post("/posts/addPost", formdata, config);

    console.log("save post: response is", response);

    setText("");
    setShowModal(false);

    if (response.data.success) setPosts([...posts, response.data.post]);
  };
  const handleImageChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);
    // console.log('File is', e.target.files[0])

    const file = e.currentTarget.files[0];

    setFileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setBlobFile(e.currentTarget.files[0]);
  };
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>Profile Component:</h1>
      <h1> Welcome: {loggedInUser ? loggedInUser.username : "Stranger"}</h1>
      <button onClick={() => setShowModal(true)}>Add post</button>
      <h1>Your Posts:</h1>
      {posts?.map((item) => (
        <div
          style={{
            border: "1px solid",
            padding: "30px",
            margin: "20px",
          }}
          key={item?._id}
        >
          <p>{item?.description}</p>
          <img
            src={item?.image}
            alt=""
            style={{ height: "300px", width: "300px", objectFit: "cover" }}
          />
          <button>Delete post</button>
          <button>Edit post</button>
        </div>
      ))}
      {showModal ? (
        <Modal
          save={handleSave}
          close={() => setShowModal(false)}
          valueText={text}
          onTextChange={(e) => setText(e.target.value)}
          onChangeFile={handleImageChange}
        />
      ) : null}
    </div>
  );
}
