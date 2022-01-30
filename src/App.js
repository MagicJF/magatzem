import './App.css';
import SearchBar from './SearchBar';
import AddItem from './AddItem';
import { useState, useEffect } from 'react';
import ItemsDisplay from './ItemsDisplay';
import axios from 'axios';

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  const [Hola, setName] = useState(null);
  const [Hola2, setName2] = useState(null);
  const [Hola3, setName3] = useState(null);
  const [Hola4, setName4] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setData({ items: data }));
  }, []);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setName(res.name);
      });
  }, []);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/ditto').then((res) => {
      console.log(res);
      console.log(res.data.moves[0].move.url);
      setName2(res.data.moves[0].move.url);
    });
  }, []);

  useEffect(() => {
    fetch('/datos/persona.json')
      .then((res) => res.json())
      .then((res) => {
        setName3(res.text);
        console.log(res);
      });
  }, []);

  useEffect(() => {
    axios.get('https://api.agify.io/?name=michael').then((res) => {
      setName4(res.data.name);
    });
  }, []);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = (item) => {
    const items = data['items'];
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  };

  const addItemToData = (item) => {
    let items = data['items'];

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    };
    fetch('http://localhost:3000/items', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        items.push(data);
        setData({ items: items });
      });
  };

  const filterData = (data) => {
    const filteredData = [];

    if (!filters.name) {
      return data;
    }

    for (const item of data) {
      if (filters.name !== '' && item.name !== filters.name) {
        continue;
      }
      if (filters.price !== 0 && item.price > filters.price) {
        continue;
      }
      if (filters.type !== '' && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== '' && item.brand !== filters.brand) {
        continue;
      }

      filteredData.push(item);
    }

    return filteredData;
  };

  return (
    <div className='container'>
      <div className='row mt-3'>
        <ItemsDisplay
          deleteItem={deleteItem}
          items={filterData(data['items'])}
        ></ItemsDisplay>
      </div>
      <div className='row mt-3'>
        <SearchBar updateSearchParams={updateFilters}></SearchBar>
      </div>
      <div className='row mt-3'>
        <AddItem addItem={addItemToData}></AddItem>
      </div>
      <div>{Hola}</div>
      <div>{Hola2}</div>
      <div>{Hola3}</div>
      <div>{Hola4}</div>
    </div>
  );
}

export default App;
