import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiUrl from '../../apiConfig';
import "./style.css"

// Full blog view
const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      }
    };

    fetchPost();
  }, [postId, navigate]);

  return (
    <div>
      {post ? (
        <div className='full-blog-page'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link className="btn btn-outline-primary" to="/">Back to Home</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetail;
