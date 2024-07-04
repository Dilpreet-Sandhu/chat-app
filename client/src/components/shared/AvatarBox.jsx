import { Avatar, AvatarGroup, Stack } from '@mui/material'
import React from 'react'

const AvatarBox = ({avatar=[],max="4"}) => {
  return (
    <Stack direction={'row'} spacing="0.5">
        <AvatarGroup>
            {
                avatar.map((src,index) => {
                    return <Avatar
                    src={src}
                    key={Math.random() * 100}
                    alt='image'
                    sx={{
                        width:'3rem',
                        height:"3rem",
                        border:'2px solid white',
                        position:'absolute',
                        left: {
                            xs : `${0.5 + index}rem`,
                            sm : `${index}rem`
                        },
                        top : '3px'
                    }}
                    />
                })
            }
        </AvatarGroup>
    </Stack>
  )
}

export default AvatarBox
