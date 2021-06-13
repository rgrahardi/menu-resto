import React, { useState, useEffect } from 'react'
import Stock from './component-resto/Stock'
import Menu from './component-resto/Menu'
import Order from './component-resto/Order'

import './index.css';

const INITIAL_STOCK = [
  {
    id: 0,
    label: 'Gula',
    amount: 10
  },
  {
    id: 1,
    label: 'Garam',
    amount: 20
  },
  {
    id: 2,
    label: 'Kopi Bubuk',
    amount: 15
  },
  {
    id: 3,
    label: 'Krimer',
    amount: 30
  },
  {
    id: 4,
    label: 'Teh',
    amount: 13
  },
  {
    id: 5,
    label: 'Pisang',
    amount: 9
  },
  {
    id: 6,
    label: 'Telur',
    amount: 22
  },
  {
    id: 7,
    label: 'Tepung',
    amount: 17
  },
  {
    id: 8,
    label: 'Meses',
    amount: 15
  },
  {
    id: 9,
    label: 'Keju',
    amount: 7
  }
];

const INTIIAL_MENU = [
  {
    id: 0,
    label: 'Kopi Tubruk',
    available: true,
    price: 3000,
    ingredients:[
      {
        id: 0,
        amount: 1
      },
      {
        id: 2,
        amount: 1
      }
    ]
  },
  {
    id: 1,
    label: 'Kopi Susu',
    price: 3500,
    available: true,
    ingredients:[
      {
        id: 0,
        amount: 1
      },
      {
        id: 2,
        amount: 1
      },
      {
        id: 3,
        amount: 2
      }
    ]
  },
  {
    id: 2,
    label: 'Pisang Goreng',
    price: 2000,
    available: true,
    ingredients:[
      {
        id: 5,
        amount: 1
      },
      {
        id: 1,
        amount: 1
      },
      {
        id: 6,
        amount: 2
      },
      {
        id: 7,
        amount: 1
      }
    ]
  },
  {
    id: 3,
    label: 'Pisang Goreng Coklat',
    price: 2500,
    available: true,
    ingredients:[
      {
        id: 5,
        amount: 1
      },
      {
        id: 1,
        amount: 1
      },
      {
        id: 6,
        amount: 1
      },
      {
        id: 7,
        amount: 1
      },
      {
        id: 8,
        amount: 2
      }
    ]
  },
  {
    id: 4,
    label: 'Pisang Goreng Keju',
    price: 2500,
    available: true,
    ingredients:[
      {
        id: 5,
        amount: 1
      },
      {
        id: 1,
        amount: 1
      },
      {
        id: 6,
        amount: 1
      },
      {
        id: 7,
        amount: 1
      },
      {
        id: 9,
        amount: 2
      }
    ]
  },
  {
    id: 5,
    label: 'Teh Manis',
    price: 1500,
    available: true,      
    ingredients:[
      {
        id: 4,
        amount: 1
      },
      {
        id: 0,
        amount: 1
      }
    ]
  },
  {
    id: 6,
    label: 'Teh Susu',
    price: 2000,
    available: true,
    ingredients:[
      {
        id: 4,
        amount: 1
      },
      {
        id: 0,
        amount: 1
      },
      {
        id: 3,
        amount: 1
      }
    ]
  }
]

function App() {
  const [stockItems, setStockItems] = useState(INITIAL_STOCK)
  const [menuItems, setMenuItems] = useState(INTIIAL_MENU)
  const [orderItems, setOrderItems] = useState({})

  // didalam hook useEffect kita buat arrow function sebagai parameter pertama
  // useState akan dibuat menjadi parameter kedua
  useEffect(() => {
    //pertama kali dijalankan ketika mount
    // console.log(stockItems);
    console.log('stock items changed')
    // TODO : kalau stock berubah update menu
    // untuk setiap menu, cek ketersediaan bahan2nya
    const newMenuItems = menuItems.map(obj => {
          let hasMissingIngredients = false;
          // untuk setiap bahan, cek ketersediaan di stok
          obj.ingredients.forEach(ing => {
            const st = stockItems.find(stock => stock.id ===
              ing.id);
            if (st.amount < ing.amount) {
              hasMissingIngredients = true;
              console.log(obj.label, ' kekurangan', st.label,
                'dibutuhkan: ', ing.amount, 'tersedia:',
                st.amount);
            }
          })
          // true kalo semua bahan ada, false kalo ada yang habis
          obj.available = !hasMissingIngredients;
          return obj;
          })
          setMenuItems(newMenuItems);
  }, [stockItems])

  return (
    <div className="app">
      <Stock items={stockItems} 
        onItemAdded={obj =>{
        setStockItems(currentItems => {
        const newStockItems = [...currentItems];
        const item = newStockItems.find(o => o.id === obj.id);
        item.amount += 1;
        return newStockItems;
        })
        }}
      />

      {/* di menu kita memiliki props bernama items dan event onItemSelected,
          perhatikan cara kerja reactjs buat functionnya sebagai props biar nanti bisa dijadikan argument componenet, terus dikomponent menu, karena ini function onItemSelected adalah props menu, maka buat function callback untuk menghandle proses eksekusi functionnya. jadi functionnya akan dieksekusi ketika event onClick yang dibuat pada emenent Menu */}
          {/* props items menyimpan value sebuah state */}
      <Menu items={menuItems} onItemSelected={obj => {

        setOrderItems(currentOrders => {
          const newOrders = {
            ...currentOrders
          }
          if (!newOrders[obj.label]) {
            newOrders[obj.label] = {
              ...obj,
              subtotal: obj.price,
              amount: 1
            };
          } else {
            const order = newOrders[obj.label];
            order.amount += 1;
            order.subtotal = order.price * order.amount;
          }
          return newOrders;
        })

        // jadi ceritanya kita ingin melakukan update dengan merubah nilai stockItems, sebenernya tidak merubah hanya menduplikat saja, tapi ini dianggap perubahasan oleh state
        setStockItems((currentItems) => {
          // buat duplikat stock yang sekarang  
          const newStockItems = [...currentItems];

          // setiap kali ada item di menu yang dipilih, update (kurangi) stock ingredientsnya
          obj.ingredients.forEach((ing)=>{
            newStockItems.forEach((stock) => {
            if (stock.id === ing.id) {
            stock.amount -= ing.amount;
            }
            });
          });
          return newStockItems;
        });
      }}/>
      <Order items={orderItems} 
        onItemRemoved={(obj)=>{
          setOrderItems( currentOrders =>{
          const newOrders = {...currentOrders}
          const order = newOrders[obj.label];
          order.amount -= 1;
          if(order.amount === 0 ){
          delete newOrders[obj.label];
          } else {
            order.subtotal = order.price * order.amount;
          }
          return newOrders;
          })
          setStockItems((currentItems) => {
            const newStockItems = [...currentItems];
            obj.ingredients.forEach((ing) => {
              newStockItems.forEach((stock) => {
                if (stock.id === ing.id) {
                  stock.amount += ing.amount;
                }
              });
            });
            return newStockItems;
          });

        }}/>
    </div>
  )
}

export default App;