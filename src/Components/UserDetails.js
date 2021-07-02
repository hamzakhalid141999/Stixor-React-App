import React, {useEffect} from 'react';
import { NetworkStatus, useQuery, gql } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from 'react-router';
import Aos from "aos";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


const USER_DETAIL = gql`
query($id: Int!){
    getAllUsers(id: $id) {
      id
      firstName
      lastName
      email
      password
    }
}
`;

function UserDetails(props) {

    useEffect(()=>{
        Aos.init({duration: 500});
      },[]);

    const location = useLocation();

    const classes = useStyles();
 
    
    //Pass the id to the Query to fetch details of the related Album
    const id = location.userID;

    console.log("IDnew: ",id);


        const { data, loading, error, networkStatus } = useQuery(USER_DETAIL, {
            variables: { id },
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
        })
    
    
    if (networkStatus === NetworkStatus.refetch)
        return 'Refetching!';
    if (loading)
        return <div className={classes.root}><CircularProgress /></div>
    if (error) {
        return `Error! ${error}`;
    }
    if (data) {
        return (
            <div className={"is-detail-Page"}>
                <div className="album-detailsHead align-left is-row is-card"
                    style={{ display: 'flex', flexFlow: 'column' }}>
                    <div  className="is-row">
                        <div  className="is-100">
                            <h3 data-aos="fade-down">User Information</h3>
                        </div>
                    </div>
                </div>
                <div className="album-detailsBody is-card">
                    <div className="album-outline-container">
                        <div data-aos="fade-right" className="album-outline">
                        <table class="table table-striped">
                           
                            <tbody>
                                <tr>
                                <th scope="row">First Name</th>
                                <td><p>{data['getAllUsers'][0].firstName}</p></td>
                                </tr>
                                <tr>
                                <th scope="row">Last Name</th>
                                <td><p>{data['getAllUsers'][0].lastName}</p></td>
                                </tr>
                                <tr>
                                <th scope="row">Email</th>
                                <td><p>{data['getAllUsers'][0].email}</p></td>
                                </tr>
                                <tr>
                                <th scope="row">Password</th>
                                <td><p>{data['getAllUsers'][0].password}</p></td>
                                
                                </tr>
                            </tbody>
                            </table>

                            
                        </div>
                    </div>
                </div>
            </div>
        );


    }


}

export default UserDetails;