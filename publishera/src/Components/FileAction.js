import React, {useState, useEffect} from 'react';
import { localStorage$, currentPath$ } from '../store';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
// Get Dropbox method
const Dropbox = require('dropbox').Dropbox;

export function FileActionBtn(props) {
  const [ currentPath, setCurrentPath] = useState('');
  const [ reviewList, setReviewList] = useState([]);
  const [ itemToUpload, setItemToUpload ] = useState({});
  const [ newfolderName, setNewfolderName ] = useState('');
  const [ logOut, setLogOut ] = useState(false);

  let cleanedCurrentPath = '';

  let getUser = new Dropbox({accessToken: localStorage$.value });
  
  useEffect (() => {
    let subscription = currentPath$.subscribe((currentPath) => { 
      setCurrentPath(currentPath);
    });
    
    gerCleanedPath();
    
    getUser.filesListFolder({path: cleanedCurrentPath})
    .then(response => {
      let getItemArr = response.entries;
      
      setReviewList(getItemArr);
      
      // ===========================================================================================================
    })
    .catch(error => {
      console.error(error);
    }); 
  },  [ currentPath ]);
  function gerCleanedPath() {
    let cleanedCurrentPath = currentPath.replace(/%20/g, " ");
    if (cleanedCurrentPath === "/") {
      cleanedCurrentPath = "";
    }
    return cleanedCurrentPath;
  }
  
  let patchInCurrentFolder = reviewList.map(item => item.path_lower);

  // Upload a file
  function onChangeFile(e){
    e.preventDefault();
    setItemToUpload(e.target.files);
  }
  function upLoadFile(e) {
    e.preventDefault();
    console.log(itemToUpload[0]);
    
    //const tagetItem = e.target.value;
    
    let cleanedCurrentPath = currentPath.replace(/%20/g, " ");
    gerCleanedPath();
    
    getUser.filesUpload({
      contents: itemToUpload[0],
      path: currentPath$.value + '/' + itemToUpload[0].name,
      mode: 'add',
    })
    .then((res) => {
      getUser.filesListFolder({path: cleanedCurrentPath})
      .then((res) => {
        let getItemArr = res.entries;
        console.log(setReviewList);
        setReviewList(getItemArr);
      });

    })
  }
  function newFolderName(e) {
    e.preventDefault();
    let nameForFolder = e.target.value;
    setNewfolderName(nameForFolder);
  }
  function createFolder(e){
    e.preventDefault();
      console.log(newfolderName);   
      gerCleanedPath();
    getUser.filesCreateFolderV2({
      path: currentPath + '/' + newfolderName
    })
    .then((res) => {
      getUser.filesListFolder({path: cleanedCurrentPath})
      .then((res) => {
        let getItemArr = res.entries;
        console.log(setReviewList);
        setReviewList(getItemArr);
      });
    })
  }
  function disconnect() {
    setLogOut(true);
    console.log(logOut);
    localStorage.removeItem('insurtUrlParts');
  }
    return (
      <>
        {(logOut === true) ? <Redirect to="/"/> :
        <section id="actionBtnContainer">  
          <form>
            <input id="itemToUpLoad" type="file" onChange={ onChangeFile }/>
            <button 
              className="button btnUpLoad"
              type="submit"
              value=""
              onClick={ upLoadFile }>
                Ladda Upp
            </button>
          </form>           

          <form>
            <i className="button material-icons" id="newFolder" onClick={ createFolder }>
                create_new_folder
              </i>
            <input id="createFoldersName" type="text" onChange={ newFolderName }/>
          </form>       
          <button className="button logOutBtn"onClick={ disconnect }> Logga Ut</button>
        </section>
        }
      </>
    );
  }
