import { FileOpen } from '@mui/icons-material';
import React from 'react'

const ShowAttachment = ({file,url}) => {
  switch (file) {
    case "video":
        return <video src={url} preload='none' width={"200px"} controls/>
        break;

    case "image" : 
        return <img src={url} alt='attachment' width="200px" height={"150px"} style={{objectFit:"contain"}}/>
        break;
    case "audio" : 
        return <audio src={url} alt='attachment' controls preload='none'/>
        break;
  
    default:
        return <FileOpen/>
        break;
  }
}

export default ShowAttachment
