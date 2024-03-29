import React from "react";
import Card from "../Card/Card"; // Corrección
import "./Cardscontainer.style.css";

const CardsContainer = ({ currentProducts }) => {
  return (
    <div className="container">
      {currentProducts.length > 0 ? (
        currentProducts.map((m) => {
          return (
            <div className="card" key={m.id}>
              <Card
                imagePath={m.imagePath}
                name={m.name}
                description={m.description}
                price={m.price}
                id={m.id}
                count={m.count}
              />
            </div>
          );
        })
      ) : (
        <div className="noProducts">
          <h1>No se encontraron muebles con esos parámetros</h1>
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
