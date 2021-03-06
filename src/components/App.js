import React from 'react'
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Header from "./Header";
import sampleBurgers from '../sample-burgers'
import Burger from "./Burger";
import base from '../base'
import PropTypes from "prop-types";
import SignIn from "./Auth/SignIn";
import firebase from "firebase/app";

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object
    }
    
    state = {
        burgers: [],
        order: []
    }
    
    componentDidMount() {
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.restaurantId);
        
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        
        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers',
            asArray: true
        });
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addBurger = (burger) => {
        let burgerId = 0;
        this.state.burgers.forEach(burger => {
            if (burgerId < burger.id) {
                burgerId = burger.id
            }
        });
        
        burger.id = burgerId + 1;
        const burgersCopy = [...this.state.burgers];
        burgersCopy.push(burger);
        this.setState({burgers: burgersCopy})
    }

    addOrder = (orderId) => {
        const orderCopy = [...this.state.order];
        let orderObject = orderCopy.find(order => order.orderId === orderId);
        orderObject ? orderObject.count += 1 : orderCopy.push({orderId: orderId, count: 1});
        this.setState({order: orderCopy})
    }

    loadSampleBurgers = () => {
        const burgersCopy = [...this.state.burgers];
        burgersCopy.push(...sampleBurgers);
        this.setState({burgers: burgersCopy});
    }

    updateBurger = (updatedBurger, index) => {
        const burgersCopy = [...this.state.burgers];
        burgersCopy[index] = updatedBurger;
        this.setState({burgers: burgersCopy});
    }
    
    deleteOrder = (id) => {
        let orderCopy = [...this.state.order];
        orderCopy = orderCopy.filter(order => {
            return order.orderId !== id && order;
        })
        this.setState({order: orderCopy});
    }

    deleteBurger = (id) => {
        let burgersCopy = [...this.state.burgers];
        burgersCopy = burgersCopy.filter(burger => {
            return burger.id !== id && burger;
        })
        this.setState({burgers: burgersCopy});
        this.deleteOrder(id);
    }
    
    handleLogout = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        return (
            <SignIn>
                <div className='burger-paradise'>
                    <div className='menu'>
                        <Header title={'Hot Burgers'} />
                        <ul className='burgers'>
                            {
                                this.state.burgers.length > 0 && 
                                this.state.burgers.map(burger => {
                                    return <Burger
                                        key={burger.id}
                                        burger={burger}
                                        addOrder={this.addOrder}
                                    />
                                })
                            }
                        </ul>
                    </div>
                    <Order
                        order={this.state.order}
                        burgers={this.state.burgers}
                        deleteOrder={this.deleteOrder}
                    />
                    <MenuAdmin
                        deleteBurger={this.deleteBurger}
                        updateBurger={this.updateBurger}
                        burgers={this.state.burgers}
                        addBurger={this.addBurger}
                        loadSampleBurgers={this.loadSampleBurgers}
                        handleLogout={this.handleLogout}
                    />
                </div>
            </SignIn>
        )
    }
}

export default App;