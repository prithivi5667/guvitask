
import React from 'react';

import { Link } from 'react-router-dom';

const Profile = (props) => {
  console.log(props.getall)
  const {age,mobile,gender,name,email,username}=props.getall
  
    const userData = props.user ? 
    (<div >

    {/* <div>
        <h1>Profile</h1>
        
        <p><strong>Name:</strong> {props.user.name}</p> 
        <p><strong>Email:</strong> {props.user.email}</p> 
        <p><strong>ID:</strong> {props.user.id}</p> 
        <p><strong>ID:</strong> {props.user.profilepic}</p> 
        
    </div> */}
    <div>
      
            <div>
            
            <p>Name:{name}</p>
            <p>UserName:{username}</p>
            <p>Age:{age}</p>
            <p>Gender:{gender}</p>
            <p>Mobile:{mobile}</p>
            <p>Email:{email}</p>
        </div>
        
        
       
    </div>
    <div >
  <div className="row">
    <div className="col">
    <Link className="btn btn-primary  links"to="/update">Update Profile</Link> 
    </div>
    
    
  </div>
</div>
    
    </div>
    
    
    
    
    
    
    
    ) : <h4>Loading...</h4>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div>
            { props.user ? userData : errorDiv() }
        </div>
    );

}

export default Profile;