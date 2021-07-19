import React from "react";
import { useState, useEffect } from "react";
import { db } from "../config";
import FeedList from "./FeedList";
import "../styles.css";

const Feed = () => {
  const trendingApi =
    "https://api.giphy.com/v1/gifs/trending?api_key=ipt5l0S0VJXOiOQaH0izMBlvArQJBi1B&limit=25&rating=g";
  const searchApi =
    "https://api.giphy.com/v1/gifs/search?api_key=ipt5l0S0VJXOiOQaH0izMBlvArQJBi1B&q=";

  const [textInput, setTextInput] = useState();
  const [fetchPost, setFetchPost] = useState([]);

  const [gif, setGif] = useState([]);
  const [displayGif, setDisplayGif] = useState("");
  const [toggle, setToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const textHandler = (e) => {
    setTextInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("posts").add({ postText: textInput, gif: displayGif });
    setTextInput("");
    setDisplayGif("")
  };

  const getPosts = () => {
    db.collection("posts").onSnapshot(function (querySnapshot) {
      setFetchPost(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          postText: doc.data().postText,
          gif: doc.data().gif
        }))
      );
    });
  };

  const getGif = () => {
    setToggle(!toggle);
    fetch(trendingApi)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setGif(data.data);
      });
  };

  const inputFetch = (e) => {
    setSearchInput(e.target.value);
    if (searchInput) {
      fetch(searchApi + searchInput)
        .then((res) => res.json())
        .then((data) => {
          console.log("searched", data.data);
          setGif(data.data);
        });
    }
  };

  return (
    <div>
      <div className="feed-input">
        <form onSubmit={submitHandler}>
          <input type="text" value={textInput} onChange={textHandler} />

          <button disabled={!textInput} type="submit">
            Post
          </button>
        </form>
        <button onClick={getGif}>Gif</button>
        <img src={displayGif} />
      </div>
      {textInput}

      {/* gif button toggle */}

      {toggle ? (
        <div className="gif-modal">
          <input type="text" value={searchInput} onChange={inputFetch} />

          {gif.map((gif, index) => (
            <div key={gif.id}>
              <img
                src={gif.images.fixed_width.url}
                alt="gif"
                onClick={() => {
                  setDisplayGif(gif.images.fixed_width.url);
                  console.log(gif.images.fixed_width.url);
                  setToggle(!toggle);
                  setSearchInput("");
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      {/* posted feed fetch */}

      {fetchPost.map((post) => (
        <div>
          <FeedList postText={post.postText} id={post.id} gif={post.gif} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
