import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import NoResultsFound from '../NoResultsFound';
import PostForm from '../PostForm';

import "./style.css";

const Home = ({searchTerm}) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the search term
  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  // Remove the deleted post from the state
  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'DELETE',
      });

      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Set the postId to indicate editing mode
  const handleEdit = (postId) => {
    setEditingPostId(postId);
  };

// Reset editing mode
  const handleCancelEdit = () => {
    setEditingPostId(null);
    navigate("/")
  };

  // Updates the existing post
  const handleUpdate = async (postId, updatedPost) => {
      
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (response.ok) {
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        );
  
        setPosts(updatedPosts);
        setEditingPostId(null);
        // navigate('/');
        navigate(`/posts/${postId}`);

      } else {
        console.error('Failed to update post:',response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  
// Redirect to create new post
  const handleNewBlog = () => {
    setEditingPostId(null);
    navigate('/posts/new');
  };

  return (
    <div className='home-bg-container'>
      {!searchTerm && ( // Only show the following if there's no search term
        <div className='create-bolg-bg-container'>
          <h1 className='create-blog-heading'>Create a blog</h1>
          <p className='blog-description'>Create a unique and beautiful blog easily</p>
          <button type='button' className='btn btn-outline-warning' onClick={handleNewBlog}>
            New blog
          </button>
        </div>
      )}
      <ul className='blog-unordered-list'>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id}>
              {editingPostId === post.id ? (
                <PostForm
                postId={post.id}
                initialValues={post}
                onSubmit={handleUpdate}
                onCancel={handleCancelEdit}
              />
              ) : (
                <div className='blog-card'>
                  <div className='blog-logo-content'>
                    <h1 className='title-first-latter'>{post.title[0].toUpperCase()}</h1>
                    <div>
                      <Link className='blog-title' to={`/posts/${post.id}`}>{post.title}</Link>
                      <p>{post.content}</p>
                      {/* Display the date and time */}
                      <p className='blog-date'>
                        {post.createdAt
                          ? format(new Date(post.createdAt), 'MMMM dd, yyyy hh:mm a')
                          : 'Date not available'}
                      </p>
                    </div>
                  </div>
                  <div className='delete-edit-options'>
                    <FaEdit onClick={() => handleEdit(post.id)} title="Edit" />
                    <BsFillTrashFill onClick={() => handleDelete(post.id)} title="Delete" />
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <NoResultsFound />
        )}
      </ul>
      {filteredPosts.length === 0 && posts.length === 0 && <p></p>}
    </div>
  );
};

export default Home;
