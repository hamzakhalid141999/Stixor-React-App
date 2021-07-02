import React from 'react'
import logohere from '../Images/logohere.png'
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./TopMenu.css";
import {useHistory} from "react-router"

const ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
    }
  }
`;


function TopMenu(){

    const history = useHistory();

    function sendInfo(userName){
        // var dropdown = document.getElementById("combo-box-demo");
        // var userName = dropdown.value;
        console.log(userName);
        history.push({
            pathname: '/',
            firstName: userName
        })

    }

    const { data, loading, error, networkStatus } = useQuery(ALL_USERS, { fetchPolicy: "cache-and-network" })

     
    return (
        <div style={{height: "60px"}} className="top-menu is-shadow-2">
            <div className="app__logo">
                <p className="text__left">Sti<span className="text__right">xor</span></p>
            </div>
            <div>
            {data? <div  className="searchInput">
                <Autocomplete
                onInputChange={(event,value)=>{
                    sendInfo(value || "")
                }}   
                onChange={(event, value)=>{
                    sendInfo(value?.firstName || "")
                }}   
                id="combo-box-demo"
                options={data.getAllUsers}
                getOptionLabel={(option) => option.firstName}
                style={{ width: 400, backgroundColor: 'white'}}
                renderInput={(params) => <TextField  {...params} placeholder="Enter.." variant="outlined" />}
            />
                </div> : <p>Loading</p>}
            
            </div>
            {/* <button onClick={sendInfo} className="search__btn">
                Search
            </button> */}
        </div>
    );
}

export default TopMenu;