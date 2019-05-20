import React, { PureComponent } from 'react';
//import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import { FileActionBtn } from './FileAction';
import { DbxContents } from './DbxContents';
import { NavFileStructure } from './NavFileStructure';

import { updateLogedIn } from '../store';

// Get Dropbox method
//const Dropbox = require('dropbox').Dropbox;

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() { 
    
    let currentPath = '';
    updateLogedIn(true);
  }
  
  render() {   
    return (
      <>
        <section className="contentContainer">
          <main id="contentContainer">
            <NavFileStructure location={this.props.location} />
            {
              <DbxContents 
                location={this.props.location}
                showFileList={ this.state.showFileList }
                getFileItem={ this.getFileItem }
              /> 
            }
          </main>
          <aside>
            <FileActionBtn/>
          </aside>
        </section>
      </>
    );
  }
}

  