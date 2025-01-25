import { useEffect, useState } from "react";
import "./AddItem.css";

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
    description: "",
    selectedMenu: "",
  });
  const [menus, setMenus] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getMenuApi = "https://menuapp-server.onrender.com/api/menu-manager/menu/menulist";

    const fetchMenuList = async () => {
      try {
        const response = await fetch(getMenuApi);
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    fetchMenuList();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.selectedMenu) {
      alert("Please select a menu.");
      return;
    }

    const postData = {
      menuName: formData.selectedMenu,
      itemName: formData.itemName,
      itemPrice: formData.itemPrice,
      description: formData.description,
    };

    try {
      const response = await fetch(
        "https://menuapp-server.onrender.com/api/menu-manager/item/add-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setSubmitted(true);

        setFormData({
          itemName: "",
          itemPrice: "",
          description: "",
          selectedMenu: "",
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error adding item:", errorData.message);
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the item.");
    }
  };

  return (
    <div className="add-item-form-container">
      <h2>Add New Item</h2>
      {submitted && <p className="success-message">Item added successfully!</p>}
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label htmlFor="menu">Select Menu</label>
          <select
            id="selectedMenu"
            value={formData.selectedMenu}
            onChange={handleChange}
            required
            className="menu-select"
          >
            <option value="" disabled>
              Choose a menu
            </option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu.menuName}>
                {menu.menuName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemPrice">Item Price</label>
          <input
            type="number"
            id="itemPrice"
            value={formData.itemPrice}
            onChange={handleChange}
            placeholder="Enter item price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a brief description"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
