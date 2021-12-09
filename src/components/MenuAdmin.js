import React from 'react'
import AddBurgerForm from "./AddBurgerForm";

const MenuAdmin = (props) => {
    return (
        <div className='menu-admin'>
            <h2>Management menu</h2>
            <AddBurgerForm addBurger={props.addBurger} />
            <button onClick={props.loadSampleBurgers}>Load burgers</button>
        </div>
    )
}

export default MenuAdmin;