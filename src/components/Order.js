import React from 'react'
import Shipment from "./Shipment";

const Order = ({order, burgers, deleteOrder}) => {
    let totalPrice = 0;
    if (burgers.length > 0) {
        totalPrice = order.reduce((prevValue, currItem) => {
            const burger = burgers.find(b => b.id === currItem.orderId && b.status === 'available');
            if (burger) {
                return prevValue + (burger.price * currItem.count);
            }
            return prevValue;
        }, 0)
    }
    
    return (
        <div className='order-wrap'>
            <h2>Your order</h2>
            <ul className='order'>
                {
                    order.map(order => {
                        let burger = burgers.find(b => b.id === order.orderId)
                        if(burger) {
                            if (burger && burger.status === 'available') {
                                return <li key={burger.id}>
                                    <span>
                                        <span> {order.count}p.</span>
                                        {burger.name}
                                        <span> {burger.price * order.count} ₽</span>
                                        <button onClick={() => deleteOrder(burger.id)} className='cancelItem'>&times;</button>
                                    </span>
                                </li>
                            }
    
                            return <li
                                key={order.orderId}
                                className='unavailable'
                            >
                                Sorry {burger ? burger.name : 'burger'} temporary unavailable
                            </li>
                        }
                    })
                }
            </ul>
            {
                totalPrice > 0
                    ? <Shipment totalPrice={totalPrice} /> 
                    : <div className='nothingSelected'>Choose dishes and add to your order</div>
            }
            
        </div>
    )
}

export default Order;