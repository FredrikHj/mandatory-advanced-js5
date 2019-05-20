import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import queryString from "query-string"; // Avinstallera
import { updateLocalStorage, localStorage$, logedIn$ } from '../store';

export function Auth(props) {  
  const [ redirect, setRedirect] = useState(false);
  useEffect(() => {

    let subscription = localStorage$.subscribe((localStorage) => { 
/*       if (!localStorage) {
        setUrlData(localStorage$.value);
      } */
    });
    urlCleaner();
    let urlContent = props.location.hash;
    if (urlContent != '') {
      setRedirect(true);
    }
  });

  function urlCleaner() {
    // Get the url and clean the string from letters = and &. Save the string parts into a object. 
    const parsedHash = queryString.parse(props.location.hash);
    const accessToken = parsedHash.access_token;

    saveInLocalStorage(accessToken);
    setRedirect(true);
  }
  function saveInLocalStorage(accessToken) {
    // Saving the URIObj in localStorage
    window.localStorage.setItem('insurtUrlParts', accessToken );
    updateLocalStorage(accessToken);

  }
  if (redirect === true) return <Redirect to="/Home"/>;
  return (
    <div>Du skickas nu till Dropbox för inloggning .....</div>
  );
}


