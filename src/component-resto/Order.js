import React from 'react';
import {
  FaMinusCircle
} from 'react-icons/fa';
import './orders.css';

function Order(props) {

  //props bernama items yang isinya state yang disimpan di orderItems kemudian dijadikan value di props items, orderItems ini diset object kosoong, dan akan disini oleh function setOrderItems yang disisipkan di event Onclick Menu, dimana onlclcik ini menjalankan callback funtion dan memberi nilai object sebagai argument callback function.
  const renderItems = ()=>{
  return Object.keys(props.items).map( i =>{
    const obj = props.items[i];
    return (<div key={obj.id} className="items">
      <label>{`${obj.label} x${obj.amount}`}</label>
      <div className="price">{obj.subtotal}</div>
      <button onClick={()=> {
        // ini adalah callback function yang dijalankan menggunakan trigger event onclik
        // kemudian callback membawa nilai object
        props.onItemRemoved(obj);
      }}>
      <FaMinusCircle color="red" />
      </button>
      </div>)
    })
  }

  const calculateTotal = () => {
      let sum = 0;
      for (let i in props.items) {
        sum += props.items[i].subtotal;
        }
        return sum;
        }


  return (
   <div className="orders">
  <h3>Pesanan</h3>
  { renderItems()}
  <h4>Total: {calculateTotal()}</h4>
  </div>
  );
}

export default Order;
