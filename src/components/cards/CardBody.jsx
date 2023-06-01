import React from "react";
import Card from "./Card";
import "./CardBody.css";

const CardBody = ({ newState, addItem, removeItem, addedItems,totalP }) => {
 console.log(newState)
  if (newState.length===0) {
    newState = totalP
  } 
  newState.map((product) => (product.isAdded = true));
  return (
    <div className="card__body">
      {newState.map((product) => (
        <Card
          key={product.id}
          product={product}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      ))}
      {/* {asort.map((product) => (
        <Card
          key={product.id}
          product={product}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      ))} */}
    </div>
  );
};

export default CardBody;
