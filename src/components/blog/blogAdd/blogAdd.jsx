import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./blogAdd.css";

const BlogAdd = () => {
  const [blogData, setBlogData] = useState({
    blogName: "",
    blogCategory: "",
    blogContent: "",
    blogImage: null,
    imagePreview: null,
  });

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Health",
    "Business",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData((prevState) => ({
        ...prevState,
        blogImage: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditorChange = (content) => {
    setBlogData((prevState) => ({
      ...prevState,
      blogContent: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", blogData);
  };

  return (
    <div className="blog-add-container">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="blogName">Blog Title</label>
          <input
            type="text"
            id="blogName"
            name="blogName"
            value={blogData.blogName}
            onChange={handleInputChange}
            required
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="blogCategory">Category</label>
          <select
            id="blogCategory"
            name="blogCategory"
            value={blogData.blogCategory}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="blogImage">Blog Image</label>
          <input
            type="file"
            id="blogImage"
            name="blogImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          {blogData.imagePreview && (
            <div className="image-preview">
              <img src={blogData.imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group editor-container">
          <label>Blog Content</label>
          <ReactQuill
            value={blogData.blogContent}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>

        <button type="submit" className="submit-button">
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default BlogAdd;
