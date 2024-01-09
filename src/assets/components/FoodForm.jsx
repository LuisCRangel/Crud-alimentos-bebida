import React, { useEffect, useState } from "react";

const FoodForm = ({ onSubmit, editedFood, onEditCancel }) => {
  const [name, setName] = useState(editedFood ? editedFood.name : "");
  const [type, setType] = useState(editedFood ? editedFood.type : "comida");
  const [quantity, setQuantity] = useState(
    editedFood ? editedFood.quantity : ""
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setName(editedFood ? editedFood.name : "");
    setType(editedFood ? editedFood.type : "comida");
    setQuantity(editedFood ? editedFood.quantity : "");
    setError("");
  }, [editedFood]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Es obligatorio colocar el nombre de la comida.");
      return;
    }

    const updatedFood = {
      id: editedFood ? editedFood.id : Date.now(),
      name,
      type,
      quantity: parseInt(quantity, 10),
    };

    onSubmit(updatedFood);
    setName("");
    setType("comida");
    setQuantity("");
    setError("");
  };

  return (
    <div className="foodForm__container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la comida"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="comida">Comida</option>
          <option value="bebida">Bebida</option>
        </select>
        <input
          type="number"
          placeholder="Cantidad en bodega"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="btn__add" type="submit">
          {editedFood ? "Guardar" : "Agregar"}
        </button>
        {editedFood && (
          <button type="button" onClick={onEditCancel}>
            Cancelar
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default FoodForm;
