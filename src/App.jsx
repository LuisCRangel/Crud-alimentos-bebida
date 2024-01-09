import React, { useState, useEffect } from "react";
import "./App.css";
import FoodList from "./assets/components/FoodList";
import FoodForm from "./assets/components/FoodForm";

const App = () => {
  // Estado donde se almacenara la lista de alimentos
  const [foods, setFoods] = useState([]);

  // Estado para filtrar por tipo ('Todos', 'comida', 'bebida')
  const [filterType, setFilterType] = useState("all");

  // Estado para filtrar por cantidad ('ascendente', 'descendente')
  const [sortOrder, setSortOrder] = useState("asc");

  // Función donde se carga los datos del localStorage al estado al cargar la página
  useEffect(() => {
    const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];
    setFoods(storedFoods);
  }, []);

  // Función que actualiza el localStorage cuando cambia el estado de los alimentos
  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  // Función para capitalizar la primera letra de una cadena
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Función para normalizar el nombre eliminando espacios al inicio y al final
  const normalizeFoodName = (name) => name.trim();

  // Función que verifica si ya existe un producto con el mismo nombre y tipo
  const isDuplicateFood = (newFood) =>
    foods.some(
      (food) =>
        normalizeFoodName(food.name.toLowerCase()) ===
          normalizeFoodName(newFood.name.toLowerCase()) &&
        food.type === newFood.type
    );

  // Función para agregar un nuevo alimento
  const handleAddFood = (newFood) => {
    const capitalizedFoodName = capitalizeFirstLetter(newFood.name);

    // Aca verificamos si ya existe un producto con el mismo nombre y tipo, si el producto existe devolvera un alert diciendo que el producto ya existe
    if (isDuplicateFood({ ...newFood, name: capitalizedFoodName })) {
      alert(`Ya existe un producto con el nombre ${capitalizedFoodName}`);
      return;
    }
    // Aca se agrega el nuevo alimento/bebida a la lista
    setFoods([...foods, { ...newFood, name: capitalizedFoodName }]);
  };
  // Función para eliminar un alimento/bebida por su ID
  const handleDeleteFood = (id) =>
    setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));

  // Función para editar alimento/bebida
  const handleEditFood = (editedFood) =>
    setFoods((prevFoods) =>
      prevFoods.map((food) => (food.id === editedFood.id ? editedFood : food))
    );

  // Función para cambiar el orden de la lista (ascendente o descendente)
  const handleToggleSortOrder = () =>
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));

  // Función para manejar cambios en el filtro por tipo
  const handleTypeChange = (e) => setFilterType(e.target.value);

  // Ordenar la lista de alimentos según el filtro y el orden seleccionados
  const sortedFoods = [...foods].sort(
    (a, b) => (sortOrder === "asc" ? 1 : -1) * (a.quantity - b.quantity)
  );

  // Filtrar la lista de alimentos según el tipo seleccionado
  const filteredFoods = sortedFoods.filter(
    (food) => filterType === "all" || food.type === filterType
  );

  return (
    <div className="App">
      <h1>Lista de Alimentos</h1>

      <h2>Crear Nueva Comida/Bebida</h2>
      {/* Formulario para agregar nuevos alimentos */}
      <FoodForm onSubmit={handleAddFood} />

      <div className="App__container">
        {/* Select para filtrar por tipo */}
        <label>
          <span className="label__span">Filtrar por tipo </span>
          <select value={filterType} onChange={handleTypeChange}>
            <option value="all">Todos</option>
            <option value="comida">Comida</option>
            <option value="bebida">Bebida</option>
          </select>
        </label>

        {/* Select para ordenar por cantidad */}
        <label>
          <span className="label__span">Ordenar por Cantidad </span>
          <select value={sortOrder} onChange={handleToggleSortOrder}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>
      </div>

      {/* Lista de alimentos filtrada y ordenada */}
      <FoodList
        foods={filteredFoods}
        onDelete={handleDeleteFood}
        onEdit={handleEditFood}
      />
    </div>
  );
};

export default App;