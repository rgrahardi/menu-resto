import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import './stock.css';

function Stock(props) {
  return (
    <div className="stock">
      <h3>Stok</h3>
      {props.items.map((obj) => {
        return (
          <div key={obj.id} className="items">
            <label>{obj.label}</label>
            <div className="amount">{obj.amount}</div>
            <button>
              <FaPlusCircle />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Stock;
