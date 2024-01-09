import React from "react";
import FoodItem from "./FoodItem";

const FoodList = ({ foods, onDelete, onEdit }) => {
  return (
    <div className="element__container">
      {foods.map((food) => (
        <FoodItem
          key={food.id}
          food={food}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default FoodList;