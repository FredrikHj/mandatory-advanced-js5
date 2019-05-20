import React, { PureComponent } from 'react';
import {Helmet} from "react-helmet";
// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

import { logedIn$ } from './store';
import { Login } from './Components/Login';
import { Auth } from './Components/Auth';
import { Home } from './Components/Home';

class MainApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authorizate: false,
      logedIn: false,
    } 
  }
  componentDidMount() {
    let subscription = logedIn$.subscribe((logedIn) => { 
      if (logedIn) {
        this.setState({logedIn: logedIn$.value});
      }
    });
    subscription.unsubscribe();
    if (this.state.authorizate === false) return <Redirect to="/"/>;
    let uriData = window.location.hash;
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fil Tjänst - {(this.state.logedIn === false ) ? 'Ej inloggad' : 'Inloggad' }
          </title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
          </link>
        </Helmet>
        <div id="appBody">
          <section id="appBody__dashboard">
          </section>
          
          <main id="appBody__mainContent">
            <header id="header">
              <section>
                <p id="headline">En Fil tjänst</p>
                <div></div>
              </section>
            </header>
            <main id="mainContent">

            <Router>
              <Route exact path="/" component={ Login } />
              <Route path="/Auth" component={ Auth } />
              <Route path="/Home" component={ Home }/>
            </Router>
          </main>
          <footer>
            Uppförd av Team Fredrik  
          </footer>
          </main>           
        </div>
      </>
    );
  }
}

export default MainApp;
