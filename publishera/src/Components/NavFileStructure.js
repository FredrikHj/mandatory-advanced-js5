import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";


export function NavFileStructure(props) {   
    return (
        <section>
            <p>Var är jag:
                {
                    props.location.pathname.split("/").map((subFolderPath, idx, fullPathArr) => {
                        const patchArr = fullPathArr.slice(1, idx + 1);
                        const currentPath = '/' + patchArr.join('/');

                        let indicateNewFolder = '';
                        let pathLink = '';
                        if (subFolderPath === '') {
                            indicateNewFolder = '';
                            pathLink = 'pathLink1';
                        }
                        if (subFolderPath != '' && subFolderPath != 'Home') {
                            indicateNewFolder = '/';
                            pathLink = 'pathLink2';
                        }
                        let insurtElement = <Link to={ currentPath } key={ idx }className={ pathLink} >{indicateNewFolder + subFolderPath.charAt(0).toUpperCase() + subFolderPath.slice(1)}</Link>;                        
                        return insurtElement;
                    })
                
                }
            </p>
        </section>
    );
  }
