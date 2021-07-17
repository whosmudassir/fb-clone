import React from "react";
import { useState, useEffect } from "react";
import { db } from "../config";
import FeedList from "./FeedList";

const Feed = () => {
  const [textInput, setTextInput] = useState();
  const [fetchPost, setFetchPost] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const textHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("posts").add({ postText: textInput });
    setTextInput("");
  };

  const getPosts = () => {
    db.collection("posts").onSnapshot(function (querySnapshot) {
      setFetchPost(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          postText: doc.data().postText
        }))
      );
    });
  };

  return (
    <div>
      <div className="feed-input">
        <p className="profile">p</p>
        <form onSubmit={submitHandler}>
          <input type="text" value={textInput} onChange={textHandler} />
          <button>Gif</button>
          <button disabled={!textInput} type="submit">
            Post
          </button>
        </form>
      </div>
      {textInput}

      {fetchPost.map((post) => (
        <div>
          <FeedList postText={post.postText} id={post.id} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
