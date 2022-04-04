import "./App.css";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useTimeout } from "./hooks/index.ts";

function App() {
  const [count, setCount] = useState(0);
  const increment = useCallback(function () {
    setCount((state) => state + 1);
  }, []);
  const decrement = useCallback(function () {
    setCount((state) => state - 1);
  }, []);
  return (
    <>
      <Suspense fallback={<div>Carregando ...</div>}>
        <Source count={count} increment={increment} decrement={decrement} />
      </Suspense>
      <Suspense fallback={<div>Carregando ...</div>}>
        <List />
      </Suspense>
    </>
  );
}
const initialItems = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }];
function List() {
  useTimeout(1500);
  const [items, setItems] = useState(null);
  async function loadItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(initialItems);
      }, 10);
    });
  }
  useEffect(() => {
    loadItems().then((result) => {
      setItems(result);
    });
  }, []);
  return <ul>{items && items.map((item, index) => <li key={index}>{item.name}</li>)}</ul>;
}
function Source({ count, increment, decrement }) {
  useTimeout(1500);
  return (
    <div className="App">
      <h1>Novo Api 18.0.0</h1>
      <div>{count}</div>
      <button onClick={increment}>Aumentar</button>
      <button onClick={decrement}>Diminuir</button>
    </div>
  );
}

export default App;
