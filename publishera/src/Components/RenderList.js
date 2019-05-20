import React, {useState, useEffect} from 'react';
import { localStorage$, updateCurrentPath } from '../store';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import { CheckItemType } from './CheckItemType';

// Get Dropbox method
const Dropbox = require('dropbox').Dropbox;

export function RenderList(props) {
    const  [thumbnail, setThumbnail ] = useState('');
    const [staredItem, setStaredItem ] = useState(false);
    let getUser = new Dropbox({accessToken: localStorage$.value });
    
    let getfileObj = props.fileObj;
    
    let thumbnails = '';
    let itemPath;
    
    useEffect(() => {                   
        getUser.filesGetThumbnail({
            path: getfileObj.path_lower,
            size: 'w64h64',
            //format: 'jpeg',
        })
        .then((res) => {
            let getThumbnailUrl = URL.createObjectURL(res.fileBlob);             
            setThumbnail(getThumbnailUrl);
        }).catch(error => {
            //console.log(error);    
        });    
        
    }, [ getfileObj.path_lower ]);

    let star;
    let toggle = 0;
    function handleStarFolders(e) {
        let targetStar = e.target.id;
        console.log(toggle);
        
        let turnTargetToNr = parseInt(targetStar);
        //console.log(turnTargetToNr);
        //console.log(staredItem);
        
        if(toggle === 0){
            
            toggle = '1';
            star = true;
        }
        if(toggle === 1){
            toggle = 0;
            star = false;
        }
            setStaredItem(star)
    
    }
    
        let getItem = <CheckItemType
            pathLocation={ props.pathLocation }
            fileObj={ props.fileObj }
            showFileList ={ props.showFileList }
            thumbnail={ thumbnail }
            removeItem={ props.removeItem }
            downLoadFile={ props.downLoadFile }
        />

    return getItem  
}