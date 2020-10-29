import React from 'react';
const Post = ({post, onRemovePost=f=>f,editingPost=f=>f}) =>
    <div className="single-post" key={post.id}>
        <h4>Title:{post.title}</h4>
        <p>Body:{post.body}</p>
        <button onClick={() => onRemovePost(post.id)}>Delete Post</button>
        <button onClick={() => editingPost(post.id)}>Edit Post</button>
        <hr/>
    </div>
export default Post;
