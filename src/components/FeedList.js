import React from "react";
import "../styles.css";

const FeedList = ({ postText, id }) => {
  return (
    <div>
      <div className="feed">
        <span className="profile"></span>

        <p className="post-text">{postText}</p>
        <img src="" alt="gif" />
      </div>
    </div>
  );
};

export default FeedList;
