import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObjetct] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObjetct(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      //the url is based on the router that gets the comments (url: '/byId/:id') on file server>routes>Comments.js
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        'http://localhost:3001/comments',
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'), // this is getting the token from the session storage of the browser
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error.message);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]); //adding the new comment to the comments state so that it is displayed right away when we add it
          setNewComment(''); // this will clear the value of the input after commiting the post
        }
      });
  };
  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{postObject.title}</div>
          <div className='body'>{postObject.postText}</div>
          <div className='footer'>{postObject.username}</div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input
            type='text'
            value={newComment}
            placeholder='Comment...'
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment, key) => {
            return (
              <div key={key} className='comment'>
                {comment.commentBody}
                <br />
                <label> Username: {comment.username} </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
