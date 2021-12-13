import React from 'react'
import PropTypes from "prop-types";

const EditBurgerForm = ({addBurger, burger, deleteBurger, index, updateBurger}) => {
    const createBurger = (event) => {
        event.preventDefault();

        const burger = {
            id: 0,
            name: event.target['name'].value,
            price: parseFloat(event.target['price'].value) || 0,
            status: event.target['status'].value,
            desc: event.target['desc'].value,
            image: event.target['image'].value
        };
        
        addBurger(burger);
        event.currentTarget.reset();
    }
    
    const handleChange = (event) => {
        const updatedBurger = {
            ...burger,
            [event.currentTarget.name]: event.currentTarget.name === 'price'
                ? parseFloat(event.currentTarget.value) || 0
                : event.currentTarget.value
        };
        updateBurger(updatedBurger, index)
    }

    return (
        <form className='burger-edit' onSubmit={createBurger}>
            <input
                onChange={handleChange}
                value={burger.name}
                name='name'
                type='text'
            />
            <input
                onChange={handleChange}
                value={burger.price}
                name='price'
                type='text'
            />
            <select
                onChange={handleChange}
                name='status'
                className='status' 
                value={burger.status}
            >
                <option value='available'>Available</option>
                <option value='unavailable'>Away from menu</option>
            </select>
            <textarea onChange={handleChange} value={burger.desc} name='desc' />
            <input
                onChange={handleChange}
                value={burger.image}
                name='image'
                type='text'
            />
            <button onClick={() => deleteBurger(burger.id)} type='submit'>Remove from menu</button>
        </form>
    )
}

EditBurgerForm.propTypes = {
    addBurger: PropTypes.func,
    deleteBurger: PropTypes.func,
    updateBurger: PropTypes.func,
    index: PropTypes.number,
    burger: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        desc: PropTypes.string,
        status: PropTypes.string,
    }),
}

export default EditBurgerForm;
