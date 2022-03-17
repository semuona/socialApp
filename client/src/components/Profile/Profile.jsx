import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SocialAppContext } from "../Context";
import Modal from "../Modal/Modal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import "./profile.css";

export default function Profile() {
  const { users, posts, setPosts, setUsers, loggedInUser, setLoggedInUser } =
    useContext(SocialAppContext);

  // States
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [blobFile, setBlobFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileBlobFile, setProfileBlobFile] = useState(null);
  const [loggedInUserPosts, setLoggedInUserPosts] = useState([]);

  const data = {
    owner: loggedInUser?._id,
    description: text,
    image: fileUrl,
  };
  /* ----------------PROFILE IMAGE----------------------------------------- */
  useEffect(() => {
    setProfileUrl(loggedInUser?.image);
  }, []);
  /* useEffect(()=> {
 const getData = () => {
posts.filter(item ) => {
  if (item.id === )
}

 }
}) */
  const handleProfilePhoto = async () => {
    const formdata = new FormData();

    formdata.set("_id", loggedInUser?._id);

    if (profileBlobFile)
      formdata.set("image", profileBlobFile, "profile_image"); // add a file and a name

    const config = {
      headers: { "content-type": "mulitpart/form-data" },
    };

    const response = await axios.patch("/users/profile", formdata, config);
    console.log("response from profile photo is", response);

    if (response.data.success) setLoggedInUser({ ...response.data.user });
  };

  /* --------------------POST IMAGE--------------------------------------------- */
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

  /* -------------POST IMAGE CHANGE ---------------------- */
  const handleImageChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);
    // console.log('File is', e.target.files[0])

    const file = e.currentTarget.files[0];

    setFileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setBlobFile(e.currentTarget.files[0]);
  };

  /* -------------Profile CHange--------------------- */
  const handleProfileChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);

    const file = e.currentTarget.files[0];

    setProfileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setProfileBlobFile(e.currentTarget.files[0]);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  return (
    <div className="profileContainer">
      <div className="profileInfo">
        <img
          src={profileUrl}
          alt="userImage"
          className="profilePic"
          style={{ height: "150px", width: "150px", objectFit: "cover" }}
        />
        <h1>
          {" "}
          Welcome: @{loggedInUser ? loggedInUser.username : "Stranger"}{" "}
          <div>
            <h5>{loggedInUser?.followers.length} followers</h5>{" "}
            <h5> 3 posts</h5>{" "}
          </div>
        </h1>

        <ColorButton variant="contained" onClick={() => setShowModal(true)}>
          Add Post
        </ColorButton>

        <div>
          <label
            htmlFor="file1"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "260px",
              left: "420px",
            }}
          >
            <AddAPhotoIcon />
          </label>
          <div>
            <SaveAsIcon
              onClick={handleProfilePhoto}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "290px",
                left: "420px",
              }}
            />
          </div>
          <input
            accept="image/*"
            onChange={handleProfileChange}
            id="file1"
            type="file"
            style={{ visibility: "hidden" }}
            //value={profileBlobFile}
          />
        </div>
      </div>
      <h1>Your Posts:</h1>
      <div className="userPostContainer">
        {posts?.map((item) =>
          item?.owner._id === loggedInUser?._id ? (
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
            </div>
          ) : null
        )}
      </div>
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
