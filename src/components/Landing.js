import React, {useState} from 'react'
import restaurants from '../sample-restaurants'

const Landing = (props) => {
    const [display, setDisplay] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    
    const displayList = () => {
        setDisplay(!display);
    };

    const getTitle = (restaurant) => {
        setRestaurant({ title: restaurant.title, url: restaurant.url });
        setDisplay(!display);
    };

    const goToRestaurant = () => {
        props.history.push(`/restaurant/${restaurant.url}`);
    };
    
    return (
        <div className='restaurant_select'>
            <div className='restaurant_select_top'>
                <div 
                    className='restaurant_select_top-header font-effect-outline' 
                    onClick={displayList}>{restaurant?.title ? restaurant.title : 'Choose the restaurant'}</div>
                <div className='arrow_picker'>
                    <div className='arrow_picker-up' />
                    <div className='arrow_picker-down' />
                </div>
            </div>
            {
                display &&
                <div className='restaurant_select_bottom'>
                    <ul>
                        {
                            restaurants.map(restaurant => {
                                    return <li onClick={() => getTitle(restaurant)} key={restaurant.id}>{restaurant.title}</li>
                                }
                            )
                        }
                    </ul>
                </div>
            }
            {
                restaurant?.title && !display &&
                <button onClick={goToRestaurant}>Go to the restaurant</button>
            }
        </div>
    )
}

export default Landing;