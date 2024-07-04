import React from 'react'
import {Helmet} from 'react-helmet-async'
const Title = ({
    title="chat",
    description="this is a chat"
}) => {
  return (
    <>
    <title>{title}</title>
    <meta content={description}/>
    </>
        

  )
}

export default Title
