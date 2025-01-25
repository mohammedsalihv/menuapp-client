import { useState } from "react";
import "./AddMenu.css";

const AddMenu = () => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://menuapp-server.onrender.com/api/menu-manager/menu/add-menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(data.message);
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
          }, 3000);
          setFormData({});
        } else {
          console.error("Response is not JSON:", await response.text());
          alert("Expected JSON response, but received something else.");
        }
      } else {
        const errorData = await response.json();
        console.error("Error creating menu:", errorData.message);
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="add-menu-form-container">
      <h2>Create a New Menu</h2>
      {submitted && (
        <p className="success-message">Menu created successfully!</p>
      )}
      <form onSubmit={handleSubmit} className="add-menu-form">
        <div className="form-group">
          <label htmlFor="menuName">Menu Name</label>
          <input
            type="text"
            id="menuName"
            value={formData.menuName || ""}
            onChange={handleChange}
            placeholder="Enter menu name (e.g., Drinks)"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Enter a brief description"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
