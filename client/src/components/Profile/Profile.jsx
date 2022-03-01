import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SocialAppContext } from "../Context";
import Modal from "../Modal/Modal";
export default function Profile() {
  const { user, posts, setPosts, setUser } = useContext(SocialAppContext);

  // States
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const handleSave = async () => {
    console.log("saved");

    const data = {
      owner: user._id,
      text: text,
      image: image,
    };

    console.log("Home: handleSave: data is", data);
    const response = await axios.post("/posts/addPost", data);

    console.log("save post: response is", response);

    setText("");
    setImage("");
    setShowModal(false);

    if (response.data.success) setPosts([...posts, response.data.post]);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <h1>Profile Component: Welcome: username</h1>
      <button onClick={() => setShowModal(true)}>Add post</button>

      {posts?.map((item) => (
        <div
          style={{
            border: "1px solid",
            padding: "30px",
            margin: "20px",
          }}
          key={item._id}
        >
          {item.owner.username} == {item.text}
        </div>
      ))}
      {showModal ? (
        <Modal
          save={handleSave}
          close={() => setShowModal(false)}
          valueText={text}
          valueImage={image}
          onTextChange={(e) => setText(e.target.value)}
          onChangeFile={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
