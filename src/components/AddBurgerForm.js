import React from 'react'

const AddBurgerForm = (props) => {
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

    return (
        <form className='burger-edit' onSubmit={createBurger}>
            <input
                name='name' 
                type='text' 
                placeholder='Name'
                autoComplete='off'
            />
            <input 
                name='price'
                type='text' 
                placeholder='Price' 
                autoComplete='off'
            />
            <select name='status' className='status'>
                <option value='available'>Available</option>
                <option value='unavailable'>Away from menu</option>
            </select>
            <textarea name='desc' placeholder='Name' />
            <input
                name='image'
                type='text' 
                placeholder='Image'
                autoComplete='off'
            />
            <button type='submit'>+ Add to menu</button>
        </form>
    )
}

export default AddBurgerForm;