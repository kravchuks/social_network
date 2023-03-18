import React from "react";

import styles from "./Post.module.css";
import { PostsType } from "types/types";

const Post: React.FC<PostsType> = ({ image, message, like_count }) => {
  return (
    <div className={styles.item}>
      <img src={image}></img>
      {message}
      <div>
        <span>likes : {like_count}</span>
      </div>
    </div>
  );
};

export default Post;
