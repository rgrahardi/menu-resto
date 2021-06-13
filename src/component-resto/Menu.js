import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import './menu.css';

function Menu(props) {

  return (
    <div className="menu">
      <h3>Menu</h3>
      {props.items.map((obj) => {
        return (
          <div key={obj.id} className="items">
            <label>{obj.label}</label>
            <div className="price">{obj.price}</div>
            <button 
              disabled={!obj.available}
              // tambahkan callback untuk menjalankan onItemSelected
              onClick={()=>
              props.onItemSelected(obj)}>
              <FaPlusCircle color={obj.available ? 'green': 'grey'}/>              
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
