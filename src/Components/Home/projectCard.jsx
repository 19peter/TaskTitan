import * as React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export default function ActionAreaCard({projectTitle}) {
  return (
    <Card sx={{ width: 250, marginBottom: "1%" ,marginLeft:"2%"}}>
      <CardActionArea>
        <div style={{ backgroundColor: '#1565c0', height: 110 }}></div>
        {/* <CardMedia
          component="img"
          height="110"
          image="/blue.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom component="div">
            {projectTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
