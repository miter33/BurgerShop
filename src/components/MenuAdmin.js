import React, {useEffect, useState} from 'react'
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import PropTypes from "prop-types";
import firebase from "firebase/app";

const MenuAdmin = ({burgers, addBurger, deleteBurger, loadSampleBurgers, updateBurger, handleLogout}) => {
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState(null);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                authHandler({user});
            }
        })
    }, []);

    const authHandler = async authData => {
        const {email, photoURL} = authData.user;
        setUser(email);
        setPhoto(photoURL);
    }
    
    return (
        <div className='menu-admin'>
            <div className='login-header'>
                <div className='avatar'>
                    <img 
                        src={photo ?? '/images/avatar.png'}
                        alt='avatar'
                    />
                </div>
                <button className='buttonLogout' onClick={handleLogout}>Logout</button>
            </div>
            <h2>Management menu</h2>
            {
                burgers.map((burger, index) => {
                    return <EditBurgerForm
                        key={burger.id}
                        index={index}
                        burger={burger}
                        updateBurger={updateBurger}
                        deleteBurger={deleteBurger}
                    />
                })
            }
            <AddBurgerForm addBurger={addBurger} />
            <button onClick={loadSampleBurgers}>Load burgers</button>
        </div>
    )
}

MenuAdmin.propTypes = {
    addBurger: PropTypes.func,
    deleteBurger: PropTypes.func,
    loadSampleBurgers: PropTypes.func,
    updateBurger: PropTypes.func,
    burgers: PropTypes.array
}

export default MenuAdmin;