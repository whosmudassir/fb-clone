import React from "react";

const FeedList = ({ postText, id }) => {
  return (
    <div>
      <div className="feed-list">
        <p>{postText} </p>
      </div>
    </div>
  );
};

export default FeedList;
