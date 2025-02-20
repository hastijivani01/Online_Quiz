import React from 'react';
import '@mdi/font/css/materialdesignicons.min.css';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

function Home() {
  return (
    <>
    
     <div className="home background">
        <section>
            <div style={{textAlign: "center"}}>
                <span className='cube mdi mdi-cube-outline '></span>
            </div>
            <h1>Online Quiz</h1>
           
            <div className="auth-container">
               <Link to='/login' className='buttons login'>Login</Link> 
               <Link to='/signup' className='buttons signina'>Sign Up</Link> 

            </div>
        </section>
     </div>
    </>
  );
}

export default Home;
