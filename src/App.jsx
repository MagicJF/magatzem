import './App.css';
import SearchBar from './SearchBar';
import AddItem from './AddItem';
import { useState, useEffect } from 'react';
import ItemsDisplay from './ItemsDisplay';
import ItemsDisplayv2 from './ItemsDisplayv2';

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  const [Hola, setName] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setData({ items: data }));
  }, []);
  const id = 334;
  const dynamoLink = `https://qszlpvwqyc.execute-api.us-east-1.amazonaws.com/dev/get-player-score/${id}`;
  useEffect(() => {
    fetch(dynamoLink)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setName(res.user.name);
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
        console.log(data);
      });
    fetch(
      'https://qszlpvwqyc.execute-api.us-east-1.amazonaws.com/dev/create-player-score/334',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        items.push(data);
        setData({ items: items });
        console.log(data);
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
        <ItemsDisplayv2 items={data['items']}></ItemsDisplayv2>
      </div>
      <div className='row mt-3'>
        <SearchBar updateSearchParams={updateFilters}></SearchBar>
      </div>
      <div className='row mt-3'>
        <AddItem addItem={addItemToData}></AddItem>
      </div>
      <div>{Hola}</div>
    </div>
  );
}

export default App;
