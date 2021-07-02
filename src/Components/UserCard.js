import {withRouter } from "react-router-dom";
import Logo from '../Images/logohere.png'
import "./UserCard.css"
import {useHistory} from "react-router"
function UserCard({ item }) {

    const history = useHistory();

    return (

        
        <div
            onClick={()=>{
                history.push({
                    pathname: '/User',
                    userID: item.id
                    });

                localStorage.setItem("id",item.id);
            }}
            className="user__card"
        >
            <div className="img__cont">
                <div className="image-container">
                    <img className="card__logo" src={Logo} alt="Logo" />
                </div>
            </div>
            <div className="card__content">
                <p>{item.firstName} {item.lastName}</p>
            </div>
        </div>
    );
}

export default withRouter(UserCard);
