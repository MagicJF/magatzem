import { useState, useEffect } from 'react';

function IdemsDisplayDynamo(props) {
  const showItem = ({ id, name, price, type, brand }) => {
    return (
      <tr>
        <th scope='row'>{id}</th>
        <td>{name}</td>
        <td>{price}</td>
        <td>{type}</td>
        <td>{brand}</td>
      </tr>
    );
  };

  // esto es GET aws
  const QueryGETdynamoDB = { pendent: 'pendent' };

  const [Hola, setName] = useState(null);
  const GETdynamoItemID = 123890;
  const GETdynamoLink = `https://qszlpvwqyc.execute-api.us-east-1.amazonaws.com/dev/get-player-score/${GETdynamoItemID}`;
  useEffect(() => {
    fetch(GETdynamoLink)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setName(res.user.name);
      });
  }, []);

  return (
    <div className='container'>
      <div className='row'></div>
      <div className='row'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Name (ItemID)</th>
              <th scope='col'>Price</th>
              <th scope='col'>Type</th>
              <th scope='col'>Brand</th>
            </tr>
          </thead>
          <tbody>{props.items.map(showItem)}</tbody>
        </table>
        <div>{Hola}</div>
      </div>
    </div>
  );
}

export default IdemsDisplayDynamo;
