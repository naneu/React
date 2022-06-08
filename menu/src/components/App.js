import React, { useState } from "react";
import Category from "./Category";
import Menu from "./Menu";
import items from "./data";

const allCategories = ["all",...new Set(items.map((item)=> item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories,setCategories] = useState(allCategories);

  function filterItems(category) {
    if (category === "all") {
      return setMenuItems(items);
    }
    const newItems = items.filter((item) => item.category === category)
    setMenuItems(newItems)
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our Menu</h2>
          <div className="underline"></div>
          <Category filterItems={filterItems} categories={categories}/>
          <Menu menuItems={menuItems}/>
        </div>
      </section>
    </main>
  );
}

export default App;

