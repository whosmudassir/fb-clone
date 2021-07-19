import React from "react";
import "../styles.css";

const FeedList = ({ postText, id, gif }) => {
  console.log(gif);
  return (
    <div>
      <div className="feed">
        <span className="profile"></span>
        <p className="post-text">{postText}</p>

        <img src={gif} alt="gif.img" />
      </div>
    </div>
  );
};

export default FeedList;
