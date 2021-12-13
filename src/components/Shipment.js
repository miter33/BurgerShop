import React from "react";
import PropTypes from "prop-types";

const Shipment = ({totalPrice}) => {
    const shipping = totalPrice < 500 ? 399 : 99;
    const shippingNeon = shipping === 99
        ?(<span className='font-effect-neon total_wrap-cheap'>{shipping} ₽</span>)
        :(<span>{shipping} ₽</span>)
    return (
        totalPrice > 0 &&
        <div className='total'>
            <div className='total_wrap'>
                <div>
                    Delivery: {shippingNeon}
                </div>
                {
                    totalPrice < 500 &&
                    <div className='total_wrap-free'>
                        Order more on {500 - totalPrice} ₽ for order for 99 ₽
                    </div>
                }
                <div className='total_wrap-final'>
                    Total price: {totalPrice} ₽
                </div>
            </div>
        </div>
    )
}

Shipment.propTypes = {
    totalPrice: PropTypes.number
}

export default Shipment;
