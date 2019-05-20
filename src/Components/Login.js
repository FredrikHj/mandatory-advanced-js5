import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

// Access for Dropbox
const Dropbox = require('dropbox').Dropbox;

export function Login(props) {  
  function login() {
    // Authorization
    let dbx = new Dropbox({ clientId: '8y7xb20904fqrl7' });
    const webbsiteAdressOnline = 'http://fredrikHj.github.io/mandatory-advanced-js5/';
    const webbsiteAdressLocal = 'http://localhost:3000/Auth';
    let authenticationUrl = dbx.getAuthenticationUrl(webbsiteAdressOnline);
        
    // Render Authorization component and redirect to Dropbox for Auth 
    window.location = authenticationUrl;    
  }
      return (
        <> <div id="loginContainer">
              <Link id="connectBtn" to="/Auth" onClick={ login }>Anslut</Link>
           </div>
        </>
      );
    }
