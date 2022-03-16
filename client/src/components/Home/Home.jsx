import { useContext, useEffect, useState } from "react";
import { SocialAppContext } from "../Context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./home.css";
import axios from "axios";
import EditPostModal from "./EditPostModal";
import Pic from "../../img/unknown.png";
import { useHistory } from "react-router-dom";

export default function Home() {
  const { posts, setPosts, loggedInUser, setLoggedInUser, users, setUsers } =
    useContext(SocialAppContext);
  const [followedUsers, setFollowedUsers] = useState([]);
  const history = useHistory();
  /* ------------LIST POSTS--------------------------------- */
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/posts/listPosts");

      console.log("useEffect response from listing posts", response);

      setPosts([...response.data]);
      console.log("current user is", loggedInUser);
    };

    getData();
  }, []);

  /* ------------LIST USERS--------------------------------- */
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/users/list");

      console.log("useEffect response from listing posts", response);

      setUsers([...response.data]);
      console.log("all users are", users);
    };

    getData();
  }, []);

  /* ------------LIKE POSTS--------------------------------- */
  const handleLikeClick = async (postid) => {
    const response = await axios.put(
      `/posts/likeadd/${postid}/${loggedInUser._id}`
    );

    if (response.data.success) {
      const postIdx = posts.findIndex((item) => item._id === postid);

      const oldPosts = [...posts];

      oldPosts[postIdx].likes = [...response.data.post.likes];

      setPosts([...oldPosts]);
    }
  };

  /* ------------ADD FOLLOWERS--------------------------------- */
  const handleAddFallow = async (userid) => {
    const response = await axios.put(
      `/users/addfollow/${loggedInUser._id}/${userid}`
    );

    if (response.data.success) {
      const userIdx = users.findIndex((item) => item._id === loggedInUser._id);

      const oldUsers = [...users];

      oldUsers[userIdx].followers = [...response.data.user.followers];

      setUsers([...oldUsers]);
    }
  };

  /* ------------GET USER NAME OF FALLOWED USER--------------------------------- */
  useEffect(() => {
    loggedInUser?.followers?.map((followerId, idx) => {
      users?.map((item) => {
        if (item._id === followerId) {
          followedUsers.push(item.username);
        }
      });
    });
  }, []);

  /* -----------------Log Out------------------- */
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("authorizedUser");
    history.push("/Login");
    setLoggedInUser("");
  };

  return (
    <div className="homeContainer">
      <div
        style={{
          display: "flex",
          width: "550px",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px 0",
          border: "1px solid black",
          margin: "5px 0",
        }}
      >
        {followedUsers?.map((item) => (
          <div
            style={{
              borderRadius: "50%",
              border: "1px solid black",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {item}{" "}
          </div>
        ))}
      </div>
      {posts?.map((item) => (
        <div className="postContainer" key={item?._id}>
          <h1 className="creatorContainer">
            <div className="fallow">
              {" "}
              Creator:
              {item?.owner.username}{" "}
              {loggedInUser?.username === item?.owner.username ? null : (
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "blue",
                    fontWeight: "bolder",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddFallow(item?.owner._id)}
                >
                  Fallow
                </button>
              )}
            </div>
            <div>
              {" "}
              <EditPostModal style={{ cursor: "pointer" }} />
            </div>
          </h1>
          <br />
          <img
            src={item?.image}
            alt=""
            style={{ height: "500px", width: "100%", objectFit: "cover" }}
          />
          <div className="iconContainer">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <span
                style={{
                  cursor: "pointer",
                  color: item.likes.includes(loggedInUser?._id)
                    ? "red"
                    : "black",
                }}
                onClick={() => handleLikeClick(item._id)}
              >
                <FavoriteBorderIcon />
              </span>
              <div>
                <CommentIcon />
              </div>
              <div>
                <ShareIcon />
              </div>
            </div>

            <div className="editToolsContainer">
              <DeleteIcon />
              <EditIcon />
            </div>
          </div>
          <h3>{item?.description}</h3>
          <div>This post has {item.likes.length} likes</div>{" "}
          <div>View all 12 comments </div>
        </div>
      ))}
      <div className="sideProfileContainer">
        {loggedInUser ? (
          <img src={loggedInUser?.image} alt="profPic" width="150px" />
        ) : null}

        <h4>
          Hello{" "}
          {loggedInUser ? (
            <>
              {" "}
              <h4>
                {loggedInUser?.username}{" "}
                <span
                  onClick={handleLogout}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  {" "}
                  Log Out
                </span>
              </h4>{" "}
            </>
          ) : (
            <h4>{"Stranger"}</h4>
          )}
        </h4>
        <h3 style={{ color: "grey" }}>Suggestions For You</h3>
        <div className="suggestionContainer">
          {users.map((item, idx) => (
            <div className="followContainer" key={item._id}>
              {" "}
              @{item.username}{" "}
              {loggedInUser?.username === item?.owner?.username ? null : (
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "blue",
                    fontWeight: "bolder",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddFallow(users[idx]._id)}
                >
                  Fallow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
