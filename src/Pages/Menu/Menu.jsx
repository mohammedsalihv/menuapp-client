import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import "./Menu.css";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("Drinks");
  const [menuItems, setMenuItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://menuapp-server.onrender.com/api/menu-manager/menu/menulist"
          
        );
        const data = await response.json();

        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu categories:", err);
        setError("failed to fetch");
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://menuapp-server.onrender.com/api/menu-manager/item/items?menuName=${activeTab}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        setCategoryItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category items:", err);
        setError("Failed to fetch");
        setLoading(false);
      }
    };

    if (activeTab) {
      fetchCategoryItems();
    }
  }, [activeTab]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "10%",
          color: "red",
          fontWeight: "bold",
        }}
      >
        {error}
        <Link to={"/"}>
          <button className="tryAgain">Try again</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>MENU</h1>
        <p>
          Please take a look at our menu! Drinks, food, and brunch. Explore the
          options below.
        </p>
        <div className="menu-tabs">
          {menuItems.map((category) => (
            <button
              key={category._id}
              className={`menu-tab ${
                activeTab === category.menuName ? "active" : ""
              }`}
              onClick={() => setActiveTab(category.menuName)}
            >
              {category.menuName.toUpperCase()}{" "}
            </button>
          ))}

          <Link to={"/create-menu"}>
            <button className="addMenu">
              <CgAddR />
            </button>
          </Link>
        </div>
      </div>

      <div className="menu-content">
        <div className="menu-header-container">
          <h2>{activeTab.toUpperCase()}</h2>
          <Link to={"/add-item"}>
            <button className="addItem">Add new item</button>
          </Link>
        </div>

        <div className="menu-box">
          {categoryItems.length === 0 ? (
            <p>No items available for this category.</p>
          ) : (
            categoryItems.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="menu-item-header">
                  <h3>{item.itemName}</h3>
                  <span className="menu-item-price">
                    ${item.itemPrice}
                  </span>{" "}
                </div>
                <p>{item.itemDescription}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
