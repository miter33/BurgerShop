import React from "react";

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

export default Burger; 