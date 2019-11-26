import React,{ useState } from 'react'
import { Link } from 'react-router-dom';

function SideDiv(props) {
    const [btn] = useState({name:'Sign Up',link:props.link});
    return (
        <div className='imageRandom'>
            <h1>Simulation Project</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Eos deserunt earum, provident veritatis animi maiores, 
                quas commodi facere culpa, 
                consequuntur nihil est voluptas vero temporibus. 
                Optio fuga reiciendis dicta facilis.
            </p>
            <Link to={`/${btn.link}`}>
                <button>{props.name}</button>
            </Link>
        </div>
    )
}

export default SideDiv
