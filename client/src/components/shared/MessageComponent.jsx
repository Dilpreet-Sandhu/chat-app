import { Box, Typography } from '@mui/material';
import moment from 'moment';
import React, { forwardRef } from 'react'
import { fileFormat } from '../../lib/feautres';
import ShowAttachment from './showAttachment';
import {motion} from 'framer-motion';

const MessageComponent = forwardRef(({message,user},ref) => {

    const {sender,content,attachments,createdAt} = message;
 
    const sameSender = sender._id == user._id;

    const timeAgo = moment(createdAt).fromNow();
  


  return (
    <motion.div
    
      initial={{opacity:0,x : "-100%"}}
      whileInView={{opacity:1,x:"0"}}

    ref={ref} style={{
        alignSelf : sameSender ? "flex-end" : "flex-start",
        background:"white",
        color:"black",
        borderRadius:"5px",
        padding:'0.5rem',
        width:"fit-content "
    }}>
      {
        !sameSender && <Typography color={"#2694ab"} fontWeight={"600"} variant='caption'>{sender.name}</Typography>
      }
      {
        <>
         <Typography>{content}</Typography>
         </>
       
    }
    {
        attachments.length > 0 && attachments.map((attachment,idx) => {

            const url = attachment.url;
            const file = fileFormat(url);
            return <Box key={idx}>
                <a href={url} target='_blank' style={{color:"black"}}>{<ShowAttachment file={file} url={url}/>}</a>
                
            </Box>
        })
    }


    <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
      
    </motion.div>
  )
})

export default MessageComponent
