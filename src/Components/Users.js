import React from 'react';
import UserCard from './UserCard'
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Users.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));



const ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

function Users(props) {

    const location = useLocation();
    
    const searchedName = location.firstName;
    console.log(searchedName);


    const classes = useStyles();
    //Passing query to useQuery hook to fetch data
    const { data, loading, error, networkStatus } = useQuery(ALL_USERS, { fetchPolicy: "cache-and-network" })

    
    if (networkStatus === NetworkStatus['refetch'])
        return 'Refetching!';
    else if (loading)
        return <div
            id="spinner" className={classes.root}><CircularProgress /></div>
    else if (error)
        return `Error! ${error}`;
    else if (data){
        console.log(data);
    }
           
    return (
        <div className="is-scrollable-list">
            <div style={{ marginRight: "auto", marginLeft: "auto" }} className="row">

                {data ? data.getAllUsers.map((item) => (
                    <div key={item.id} className="col-md-3">
                        <UserCard
                            key={item.id}
                            item={item}
                        />
                    </div>

                )) : 'Users list undefined...'}

            </div>

        </div>
    )
}

export default Users;