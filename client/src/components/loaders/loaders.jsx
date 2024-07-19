import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
import { BouncingSkeleton } from "../../styles/styles";

const Loaders = () => {
  return (
    <div>
      <Grid container height={"calc(100vh - 4rem)"} sx={{flexWrap :"nowrap",gap :'1rem'}}>
        <Grid
          item
          sm="4"
          sx={{ display: { xs: "none", sm: "block" } }}
          md="3"
          height={"100%"}
        >
          <Skeleton variant="rectangular" height={'50%'}/>
        </Grid>
        <Grid item xs="12" sm="8" md="5" lg="6" height={"100%"}>
          {
            Array.from({length : 10}).map((_,idx) => <Skeleton key={idx} sx={{marginBottom : '10px'}} variant="rectangular" height={'5rem'}/>)
          }
        </Grid>
        <Grid
          item
          md={"4"}
          lg="3"
          sx={{ display: { xs: "none", md: "block" } }}
          height={"100%"}
        >
          <Skeleton variant="rectangular" height={'100vh'}/>
        </Grid>
      </Grid>
    </div>
  );
};
export const TypingLoader = () => {
  return <Stack
  spacing={'0.5rem'}
  direction={'row'}
  padding="0.5rem"
  justifyContent={'center'}
  >
    <BouncingSkeleton variant="circular" width={15}  height={15} style={{animationDelay:'0.1s'}}/>
    <BouncingSkeleton variant="circular" width={15}  height={15} style={{animationDelay:'0.2s'}}/>
    <BouncingSkeleton variant="circular" width={15}  height={15} style={{animationDelay:"0.3s"}}/>
    <BouncingSkeleton variant="circular" width={15}  height={15} style={{animationDelay:"0.5s"}}/>
  </Stack>
}
export default Loaders;
