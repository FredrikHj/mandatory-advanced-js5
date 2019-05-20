import React, {useState, useEffect} from 'react';
import { localStorage$, currentPath$, updateCurrentPath } from '../store';
import { RenderList } from './RenderList';
import { BrowseRouter as Router, Route, Link, Redirect} from "react-router-dom";
const Dropbox = require('dropbox').Dropbox;

export function DbxContents(props) {
  const [ accessToken, setAccessToken] = useState('');
  const [ currentPath, setCurrentPath] = useState('');
  const [showFileList, setShowFileList ] = useState([]);
  const [delItem, setdDelItem ] = useState(false);
  const [delItemName, setdDelItemName ] = useState('');
  const [itemToDel, setItemToDel ] = useState('');
  let targetItemListNr = 0;

  console.log(localStorage$.value );
  
  let getUser = new Dropbox({accessToken: localStorage$.value });
  
  //const [ listEmpty, updateListEmpty ] = useState(false);
  
  useEffect(() => {
    let subscription = localStorage$.subscribe((localStorage) => { 
      setAccessToken(localStorage);
    });  
    subscription = currentPath$.subscribe((currentPath) => { 
      setCurrentPath(currentPath);
    });  
    
    let cleanedCurrentPath = currentPath.replace(/%20/g, " ");
    
    if (cleanedCurrentPath === "/") {
      cleanedCurrentPath = "";
    }
    getUser.filesListFolder({
      path: cleanedCurrentPath,
    })
    .then(response => {
      let getItemArr = response.entries;
      setShowFileList(getItemArr);
      
      // En genväg på problemet att komma tillbaka när en folder är tom --> du skickas alltid till root folder hur fixar jag detta så man kommer till foldern över i mappstrukturen?
      if (getItemArr.length === 0) {
        console.log('Tomt!');
        
        setTimeout( function emptyFolder() {
          window.location.reload();
          updateCurrentPath('/Home');
        }, 1000);
      }
      // ===========================================================================================================
    })
    .catch(error => {
      console.error(error);
    }); 
    
    //subscription.unsubscribe();
  }, [ currentPath ]); 

  // Fix almost download ;)
  function downLoadFile(e) {
    const targetItem = e.target.id;
    console.log();
    

  }
  function askRemoveItem (e) {
    let targetItem = e.target.id;
    let targetItemListNr = parseInt(e.target.dataset.countitem);
    console.log(targetItemListNr);
    
    let getFullName1 = targetItem.split('/').reverse();
    let getDisplayName = getFullName1[0].split('.');
    
    console.log(getFullName1[0]);
    
    setdDelItemName(getFullName1[0]);
    setItemToDel(targetItem);
    setdDelItem(true);
  }
  function removeItemYes() {
    getUser.filesDeleteV2({
      path: itemToDel
    });
    // Koden tar bort Översta i listan och efter refresh är den tillbaka inkl den riktiga är borta
    let newItemList = [ ...showFileList.slice(0, targetItemListNr),  ...showFileList.slice(targetItemListNr + 1)];
    console.log(newItemList);
    setShowFileList(newItemList);
    setdDelItem(false);
  }
  function removeItemNo() {
    setdDelItem(false);
  }
return (
  <section id="tContainer">
    <div id="askDelContainer" style={(delItem === true) ? { display: 'block' } : { display: 'none' }}>
      <p id="delAsk">{ 'Radera ' + delItemName + ' ?' }</p>
      <section id="askDelBtnConatiner">
        <button className="button askDelBtn" onClick={ removeItemNo }>Nej</button><button className="button askDelBtn" onClick={ removeItemYes }>Ja</button>
      </section>
    </div> 
      {(showFileList.length != 0) ?
        <table id="itemContainer">
          <thead>
            <tr>
              <th>Mapp / Fil</th><th>Ändrad</th><th>Storlek</th><th>Verktyg</th>
            </tr>
          </thead>
          <tbody>
            {
                showFileList.map((fileObj, fileCounter ) => {
                  return(
                    <tr className="fontColor" key={ fileCounter }>
                      <RenderList 
                        pathLocation={ props.location }
                        fileObj={ fileObj }
                        listLength ={ showFileList.length }
                        removeItem={ askRemoveItem }
                        showFileList={ showFileList }
                        downLoadFile={ downLoadFile }
                      />
                    </tr>
                  );
                })
            }           
          </tbody>
        </table> : 'Hämtar listan!'
        }
      </section>
    );
  }
  


