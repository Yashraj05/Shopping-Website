import React, { useEffect, useReducer, useState } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";

import "./App.css";


const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  const initialState = {
    items: items,
  };
  // console.log(initialState)
  // const sort = items.sort((a, b) => a.title.localeCompare(b.title));

  // const dsort = items.sort((a, b) => b.title.localeCompare(a.title));
  // console.log(dsort);
  const reducer = (currentState, action) => {
    switch (action.type) {
      case "asc":
        return { items: items.sort((a, b) => a.title.localeCompare(b.title)) };
      case "des":
        return { items: items.sort((a, b) => b.title.localeCompare(a.title)) };
      case "l_h":
        return { items: items.sort((a, b) => a.price - b.price) };
      case "h_l":
        return {
          items: items.sort((a, b) => {
            return b.price - a.price;
          }),
        };
      default:
        return items;
    }
  };
  let [newState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);
  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }
  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }
  // console.log(addedItems);
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
    // console.log(addedItems);
  }

  //const asort = items.sort((a, b) => a.title.localeCompare(b.title));
  // {console.log(asort)}
  // {console.log(newState)}

  return (
    <div className="flex_display">
      {/* <Header /> */}
      <div className="filter">
        <h1>Filter Products</h1>
        <input
          type="radio"
          name="ascending"
          value="asc"
          onClick={() => dispatch({ type: "asc" })}
        ></input>
        <span>Ascending</span><br></br>
        <input
          type="radio"
          name="ascending"
          value="des"
          onClick={() => dispatch({ type: "des" })}
        ></input>
       <span>Descending</span><br></br>
        <input
          type="radio"
          name="ascending"
          value="l_h"
          onClick={() => dispatch({ type: "l_h" })}
        ></input>
        <span>Price(low to high)</span>
        <br></br>
        <input
          type="radio"
          name="ascending"
          value="h_l"
          onClick={() => dispatch({ type: "h_l" })}
        ></input>
        <span>Price(high to low)</span>
      </div>

      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSrarchData}
            />
            <Button num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          newState={newState.items}
          addItem={addItem}
          totalP={itmesFilter}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};

export default App;
