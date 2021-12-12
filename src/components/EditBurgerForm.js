import React from 'react'

const EditBurgerForm = (props) => {
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
        
        props.addBurger(burger);
        event.currentTarget.reset();
    }
    
    const handleChange = (event) => {
        const updatedBurger = {
            ...props.burger,
            [event.currentTarget.name]: event.currentTarget.value
        };
        props.updateBurger(updatedBurger, props.index)
    }

    return (
        <form className='burger-edit' onSubmit={createBurger}>
            <input
                onChange={handleChange}
                value={props.burger.name}
                name='name'
                type='text'
            />
            <input
                onChange={handleChange}
                value={props.burger.price}
                name='price'
                type='text'
            />
            <select
                onChange={handleChange}
                name='status'
                className='status' 
                value={props.burger.status}
            >
                <option value='available'>Available</option>
                <option value='unavailable'>Away from menu</option>
            </select>
            <textarea onChange={handleChange} value={props.burger.desc} name='desc' />
            <input
                onChange={handleChange}
                value={props.burger.image}
                name='image'
                type='text'
            />
            <button onClick={() => props.deleteBurger(props.burger.id)} type='submit'>Remove from menu</button>
        </form>
    )
}

export default EditBurgerForm;