import React, { useState } from "react";

const FoodItem = ({ food, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFood, setEditedFood] = useState(food);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedFood(food);
  };

  const handleSaveEdit = () => {
    onEdit(editedFood);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedFood({ ...editedFood, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isEditing ? (
        <div className="foodItem__container">
          <input
            className="foodItem__input"
            type="text"
            name="name"
            value={editedFood.name}
            onChange={handleInputChange}
          />
          <select
            className="foodItem__input"
            name="type"
            value={editedFood.type}
            onChange={handleInputChange}
          >
            <option value="comida">Comida</option>
            <option value="bebida">Bebida</option>
          </select>
          <input
            className="foodItem__input"
            type="number"
            name="quantity"
            value={editedFood.quantity}
            onChange={handleInputChange}
          />
          <div className="food__container-btn">
            <button className="btn__edit" onClick={handleSaveEdit}>
              Guardar
            </button>
            <button className="btn__del" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="food__container">
          <span className="food__container-item">{food.name}</span>
          <span className="food__container-item">Elemento: {food.type}</span>
          <span className="food__container-item">
            Cantidad en Bodega:{" "}
            {food.quantity ? food.quantity : (food.quantity = 0)}
          </span>
          <div className="food__container-btn">
            <button className="btn__edit" onClick={handleEdit}>
              Editar
            </button>
            <button className="btn__del" onClick={() => onDelete(food.id)}>
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;