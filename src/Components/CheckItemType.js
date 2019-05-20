import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import { localStorage$, updateCurrentPath } from '../store';
const Dropbox = require('dropbox').Dropbox;

let folderIndex = 0;
let countItem = 0;

export function CheckItemType(props) {
    const [ emtyFolder, setEmtyFolder ] = useState('');
    let getfileObj = props.fileObj; 
    
    let itemPath;
    let currentPath = getfileObj.path_lower//path_display;
    checkFolders(getfileObj, currentPath);
    checkFiles(getfileObj, currentPath);
    function checkFolders(getfileObj, currentPath) {
        // Folder handle
        if (getfileObj['.tag'] === 'folder') {
            countItem++;
            let folderEmpty = '';
            folderIndex++;
            checkFolderEmpty(currentPath);
            itemPath =
                <>
                    <td colSpan="3" id={ currentPath } onClick={ props.downLoadFile }>
                        <i className="material-icons starBtnFolders" //style={(staredItem === false) ? {color: 'none'} : {color: 'orange' }} id={ 0 } //onClick={ handleStarFolders }
                        >
                            star
                        </i>
                        <Link to={ '/Home'+ currentPath } className="folderLink" id={ folderIndex }>
                            <i className="material-icons folders"> folder </i>
                            <span className="folderName">-{ getfileObj.name + emtyFolder }</span>
                        </Link>

                    </td>
                    <td>
                        <i className="material-icons" id={ currentPath } data-countitem={ countItem } // ges fel värde?
                        onClick={ props.removeItem }>
                            clear
                        </i>
                    </td>
                </>
        }
        return countItem;
    }
    function checkFolderEmpty(currentPath, folderEmpty) {        
        let getUser = new Dropbox({accessToken: localStorage$.value });

        getUser.filesListFolder({path: currentPath})
        .then(response => {
            let getFolderArrEmty = response.entries.length;
            if (getFolderArrEmty === 0) {
                let folderEmptyStr =  <p> ( Mappen är tom! )</p>;
                folderEmpty = folderEmptyStr.props.children;            
            }
            if (getFolderArrEmty != 0) {
                folderEmpty = '';
            }
            setEmtyFolder(folderEmpty);
        });
    }
    function checkFiles(getfileObj, currentPath) {
        //File handler
        if (getfileObj['.tag'] === 'file') {
            countItem++;
            itemPath = 
            <>
                <td id={ currentPath } onClick={ props.downLoadFile }>
                    <i className="material-icons starBtnFiles">
                        star
                    </i>
                    <img className="files" src={ props.thumbnail } alt="En fil ikon"/>
                    { getfileObj.name }
                </td>
                <td>
                { fixModified(getfileObj.client_modified) }
                </td>
                <td>
                { fixSize(getfileObj.size) + 'mb'}
                </td>      
                <td>
                <i className="material-icons"  id={ currentPath } data-countitem={ countItem } onClick={ props.removeItem }>
                    clear
                </i>
                </td>
            </>
        }
    }

    let getPath = props.pathLocation.pathname;
    fixPathName(getPath);
    function fixPathName(getPath) {
        
        let getCleanPathName = getPath.split('Home').reverse()[0];    
        if (getCleanPathName === 'Home') {
            // Default value
            getCleanPathName = '';
        }
        updateCurrentPath(getCleanPathName);
    }
    function fixModified(modData) {
        let getModTime = modData.split('T')[1].split(':');       
        let getModDate = modData.split('T')[0];
        return getModDate + ' | ' + getModTime[0] + ':' + getModTime[1];
    }
    function fixSize(size) {
        let sizeInMb = size/(1024*1024);
        let formatSize2Decim = parseFloat(Math.round(sizeInMb * 100) / 100).toFixed(2);
        return formatSize2Decim;
    }    
    // Fix that the countItem are count according to nr of item in the list
    if (countItem === props.showFileList.length) {
        countItem = 0;
    }
    return itemPath;
}