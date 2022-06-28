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
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";

export default function Home() {
  const { posts, setPosts, loggedInUser, setLoggedInUser, users, setUsers } =
    useContext(SocialAppContext);
  const [followedUsers, setFollowedUsers] = useState([]);
  const history = useHistory();
  /* ------------LIST POSTS--------------------------------- */
  const [showEditModal, setShowEditModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([false]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState("");

  const [commentToUpdate, setCommentToUpdate] = useState({
    postid: null,
    commentid: null,
    text: "",
    idx: null,
  });

  const handleSave = async () => {
    console.log("saved");

    const data = {
      owner: users._id,
      text: newPost,
    };

    console.log("Home: handleSave: data is", data);
    const response = await axios.post("/posts/add", data);

    console.log("save post: response is", response);

    setNewPost("");
    setShowModal(false);

    if (response.data.success) setPosts([...posts, response.data.post]);
  };

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
          followedUsers.push(item.image);
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
  const handleCommentChange = (text, idx) => {
    console.log("text", text, idx);

    const oldComments = [...comments];
    oldComments[idx] = text;

    setComments([...oldComments]);
  };

  const handleAddComment = async (idx) => {
    const data = {
      postid: posts[idx]._id, // post id
      text: comments[idx],
      owner: users._id,
    };

    const response = await axios.post("/posts/comments/add", data);

    console.log("add comment response is", response);

    if (response.data.success) {
      const oldPosts = [...posts];

      oldPosts[idx].comments = [...response.data.post.comments];
      setPosts([...oldPosts]);
      setComments((comments) => {
        comments[idx] = "";
        return [...comments];
      });
    }
  };

  const handleShowComments = (idx) => {
    const oldComments = [...showComments];
    oldComments[idx] = !oldComments[idx]; // toggle show the comments

    setShowComments([...oldComments]);
  };

  const handleDeleteComment = async (idx, cidx) => {
    console.log("idx, cidx", idx, cidx);

    const postid = posts[idx]._id;
    const commentid = posts[idx].comments[cidx]._id;

    const response = await axios.delete(
      `/posts/comments/delete/${postid}/${commentid}`
    );

    console.log("delete comment response is", response);

    if (response.data.success) {
      const oldPosts = [...posts];

      oldPosts[idx].comments = [...response.data.post.comments];
      setPosts([...oldPosts]);
    }
  };

  const handleEditComment = (idx, cidx) => {
    // get text from posts state
    const text = posts[idx].comments[cidx].text;

    setCommentToUpdate({
      postid: posts[idx]._id,
      commentid: posts[idx].comments[cidx]._id,
      text,
      idx,
    });
    setShowCommentModal(true);
  };

  const handleCommentSave = async () => {
    console.log("save comment pressed");

    const { postid, commentid, text } = commentToUpdate;

    const response = await axios.put(
      `/posts/comments/edit/${postid}/${commentid}`,
      { text }
    );

    console.log("edit comment response is", response);

    if (response.data.success) {
      const idx = commentToUpdate.idx;

      setShowCommentModal(false);
      const oldPosts = [...posts];

      // update the post state with the new array of comments for the specifc post
      oldPosts[idx].comments = [...response.data.post.comments];
      setPosts([...oldPosts]);

      setCommentToUpdate({
        postid: null,
        commentid: null,
        text: "",
        idx: null,
      });
    }
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
          <img
            src={item}
            alt="hola"
            style={{
              borderRadius: "50%",
              border: "1px solid black",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ))}
      </div>
      {posts?.map((item, idx) => (
        <div className="postContainer" key={item?._id}>
          <h1 className="creatorContainer">
            <div className="fallow">
              {" "}
              Creator: @{item?.owner.username}{" "}
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
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
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
              <span onClick={() => handleShowComments(idx)}>
                <CommentIcon />
                {item.comments.length}
              </span>
              <div>
                <ShareIcon />
              </div>
            </div>

            <div className="editToolsContainer">
              <DeleteIcon />
              <EditIcon />
            </div>
          </div>
          {showComments[idx]
            ? item.comments.map((comment, cidx) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {comment.text}
                  <div className="editToolsContainer">
                    <EditIcon onClick={() => handleEditComment(idx, cidx)} />
                    <DeleteIcon
                      onClick={() => handleDeleteComment(idx, cidx)}
                    />
                  </div>
                </div>
              ))
            : null}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <textarea
              style={{ width: "300px", padding: "5px", marginRight: "10px" }}
              placeholder="Type your comment"
              value={comments[idx]}
              onChange={(e) => handleCommentChange(e.target.value, idx)}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              style={{ width: "100px", color: "green", background: "white" }}
              variant="contained"
              onClick={() => handleAddComment(idx)}
            >
              Send
            </Button>
          </div>
          <h3>{item?.description}</h3>
          <div>This post has {item.likes.length} likes</div>{" "}
          {/* <div>This post has {item.comments.length} comments</div> */}
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
        {showModal ? (
          <Modal
            save={handleSave}
            close={() => setShowModal(false)}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        ) : null}
        {showCommentModal ? (
          <Modal
            save={handleCommentSave}
            close={() => setShowCommentModal(false)}
            value={commentToUpdate.text}
            onChange={(e) =>
              setCommentToUpdate({ ...commentToUpdate, text: e.target.value })
            }
          />
        ) : null}
      </div>
    </div>
  );
}
function Modal({ save, close, value, onChange }) {
  return (
    <div
      style={{
        position: "fixed",
        background: "rgb(218, 214, 214)",
        width: "400px",
        height: "180px",
        top: "calc(100vh/2 - 150px)",
        left: "calc(100vw/2 - 150px)",
        display: "grid",
        placeContent: "center",
      }}
    >
      <textarea
        style={{ width: "300px", padding: "5px" }}
        value={value}
        onChange={onChange}
      />
      <p>
        <DeleteIcon variant="outlined" onClick={close} color="error" />
        <SaveIcon onClick={save} />
      </p>
    </div>
  );
}
