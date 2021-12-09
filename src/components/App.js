import React, {useState} from 'react'
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Header from "./Header";
import sampleBurgers from'../sample-burgers'
import Burger from "./Burger";

const App = () => {
    const [burgers, setBurgers] = useState([]);
    const [order, setOrder] = useState([]);
    
    const addBurger = (burger) => {
        let burgerId = 0;
        burgers.forEach(burger => {
            if(burgerId < burger.id) {
                burgerId = burger.id
            }
        })
        burger.id = burgerId + 1;
        setBurgers(burgers => ([
            ...burgers, burger
        ]))
    }

    const addOrder = (orderId) => {
        const orderCopy = [...order];
        let orderObject = orderCopy.find(order => order.orderId === orderId);
        orderObject ? orderObject.count += 1 : orderCopy.push({orderId: orderId, count: 1});
        setOrder(orderCopy);
    }

    const loadSampleBurgers = () => {
        setBurgers(burgers => ([
            ...burgers, ...sampleBurgers
        ]))
    }
    
    return (
        <div className='burger-paradise'>
            <div className='menu'>
                <Header />
                <ul className='burgers'>
                    {
                        burgers.map(burger => {
                            return <Burger 
                                key={burger.id} 
                                burger={burger}
                                addOrder={addOrder}
                            />
                        })
                    }
                </ul>
            </div>
            <Order />
            <MenuAdmin
                addBurger={addBurger} 
                loadSampleBurgers={loadSampleBurgers}
            />
        </div>
    )
}

export default App;