import React from "react";

function Category(props) {
    return <div className="btn-container">
        {props.categories.map((category, index) =>{
            return <button className="filter-btn" type="button" key={index} onClick={()=>props.filterItems(category)}>
                {category}
            </button>
        })}
    </div>
}

export default Category;