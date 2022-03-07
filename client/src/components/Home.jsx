import { useContext, useEffect } from "react";
import { SocialAppContext } from "./Context";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { posts, setPosts } = useContext(SocialAppContext);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/posts/listPosts");

      console.log("useEffect response from listing posts", response);

      setPosts([...response.data]);
    };

    getData();
  }, []);

  return (
    <div>
      hello home
      {posts?.map((item) => (
        <div
          style={{
            border: "1px solid",
            padding: "30px",
            margin: "20px",
          }}
          key={item?._id}
        >
          <h1>Creator: {item?.owner?.username} </h1>
          <br />
          <p>{item?.description}</p>
          <button>Delete post</button>
          <button>Edit post</button>
        </div>
      ))}
    </div>
  );
}
