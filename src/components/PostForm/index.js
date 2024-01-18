import React, { useState, useEffect } from 'react';
import "./style.css"

const PostForm = ({ postId, onSubmit, onCancel, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');

  useEffect(() => {
    if (initialValues) {
      // If initialValues are provided (for editing), set the form fields
      setTitle(initialValues.title || '');
      setContent(initialValues.content || '');
    }
  }, [initialValues]);

  // Creating new blog
  const handleSubmit = async (e) => {
        e.preventDefault();
    
        const postData = { title, content };
    
        try {
          if (postId) {
            const response = await fetch(`https://blogging-platform-hm.netlify.app/server/posts/${postId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
            });
    
            if (!response.ok) {
              throw new Error('Failed to update post');
            }
          } else {
            const response = await fetch('https://blogging-platform-hm.netlify.app/server/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
            });
    
            if (!response.ok) {
              throw new Error('Failed to create post');
            }
          }
    
          setTitle('');
          setContent('');

          if (onSubmit) {
            onSubmit(postId, postData); // Pass both postId and postData
          }
        } catch (error) {
          console.error('Error creating/updating post:', error);
        }

        

      };

  return (
    <form className='create-post-form' onSubmit={handleSubmit}>
      {/*Title input field*/}
      <input
      placeholder='TITLE'
        className='title-input'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Full-page textarea for content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        style={{ width: '100%' }}
        placeholder="Write your blog content here..."
      />

      <button className="btn btn-outline-success " type="submit">{postId ? 'Update' : 'Submit'}</button>
      {postId && <button className="btn btn-outline-danger m-3" type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default PostForm;
