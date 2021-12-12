import React from 'react'
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";

const MenuAdmin = (props) => {
    return (
        <div className='menu-admin'>
            <h2>Management menu</h2>
            {
                props.burgers.map((burger, index) => {
                    return <EditBurgerForm
                        key={burger.id}
                        index={index}
                        burger={burger}
                        updateBurger={props.updateBurger}
                        deleteBurger={props.deleteBurger}
                    />
                })
            }
            <AddBurgerForm addBurger={props.addBurger} />
            <button onClick={props.loadSampleBurgers}>Load burgers</button>
        </div>
    )
}

export default MenuAdmin;