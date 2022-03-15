import { useContext, useEffect } from "react";
import { SocialAppContext } from "./Context";
import axios from "axios";

export default function Home() {
  const { posts, setPosts, loggedInUser } = useContext(SocialAppContext);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/posts/listPosts");

      console.log("useEffect response from listing posts", response);

      setPosts([...response.data]);
    };

    getData();
  }, []);

  const handleLikeClick = async postid => {
    console.log('like clicked')
    
    const response = await axios.put(`/posts/likeadd/${postid}/${loggedInUser._id}`)

    console.log('like add reponse is: ', response)

    if (response.data.success) {

        const postIdx = posts.findIndex(item => item._id == postid)


        const oldPosts = [...posts]

        oldPosts[postIdx].likes = [...response.data.post.likes]

        setPosts([...oldPosts])

    }
}

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
          <div style={{display:'flex', justifyContent: 'space-around'}}>
                    <span style={{cursor: 'pointer', color: item.likes.includes(loggedInUser?._id) ? 'red' : 'black'}} onClick={() => handleLikeClick(item._id)}>Like</span>
                    <div>Likes: {item.likes.length}</div> 
                    <div>Comments: 0</div>   
                </div>
        </div>
      ))}
    </div>
  );
}
