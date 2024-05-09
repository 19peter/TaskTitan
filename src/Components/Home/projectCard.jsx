import React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ActionAreaCard({ projectTitle, id,backgroundColor }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  //#45a29e


  return (
    <Card onClick={handleClick} sx={{ width: 240, marginBottom: "1%", marginLeft: "2%" }}>
      <CardActionArea>
        <div style={{ backgroundColor: backgroundColor, height: 110 }}></div>
        <CardContent>
          <Typography gutterBottom component="div">
            {projectTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
