import React from 'react'
import Shipment from "./Shipment";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import PropTypes from "prop-types";

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
            <TransitionGroup component='ul' className='order'>
                {
                    order.map(order => {
                        let burger = burgers.find(b => b.id === order.orderId)
                        if (burger) {
                            if (burger && burger.status === 'available') {
                                return (
                                    <CSSTransition
                                        key={burger.id}
                                        classNames='order'
                                        timeout={{enter: 1000, exit: 1000}}
                                    >
                                        <li key={burger.id}>
                                            <span>
                                                <TransitionGroup component='span' className='count'>
                                                    <CSSTransition
                                                        classNames='count'
                                                        key={order.count}
                                                        timeout={{enter: 500, exit: 500}}
                                                    >
                                                        <span> {order.count}p.</span>
                                                    </CSSTransition>
                                                </TransitionGroup>
                                                {burger.name}
                                                <span> {burger.price * order.count} ₽</span>
                                                <button onClick={() => deleteOrder(burger.id)}
                                                        className='cancelItem'>&times;</button>
                                            </span>
                                        </li>
                                    </CSSTransition>
                                )
                            }

                            return (
                                <CSSTransition
                                    classNames='order'
                                    key={burger.id}
                                    timeout={{enter: 500, exit: 500}}
                                >
                                    <li
                                        key={order.orderId}
                                        className='unavailable'
                                    >
                                        Sorry {burger ? burger.name : 'burger'} temporary unavailable
                                    </li>
                                </CSSTransition>
                            )
                        }
                    })
                }
            </TransitionGroup>
            {
                totalPrice > 0
                    ? <Shipment totalPrice={totalPrice}/>
                    : <div className='nothingSelected'>Choose dishes and add to your order</div>
            }

        </div>
    )
}

Order.propTypes = {
    order: PropTypes.array,
    deleteOrder: PropTypes.func,
    burgers: PropTypes.array
}
export default Order;
