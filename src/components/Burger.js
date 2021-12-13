import React from "react";
import PropTypes from "prop-types";

const Burger = ({burger, addOrder}) => {
    const {image, name, price, desc, status, id} = burger;
    const isAvailable = status === 'available';
    return (
        <li className='menu-burger'>
            <div className='image-container'>
                <img src={image} alt={name} />
            </div>
            <div className='burger-details'>
                <h3 className='burger-name'>
                    {name}
                    <span className='price'>{price} ₽</span>
                </h3>
                <p>{desc}</p>
                <button
                    onClick={() => addOrder(id)}
                    disabled={!isAvailable} 
                    className='buttonOrder'
                >
                    {
                        isAvailable ? 'Order' : 'temporarily not'
                    }
                </button>
            </div>
        </li>
    )
}

Burger.propTypes = {
    burger: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        desc: PropTypes.string,
        status: PropTypes.string,
    }),
    addOrder: PropTypes.func
}

export default Burger; 