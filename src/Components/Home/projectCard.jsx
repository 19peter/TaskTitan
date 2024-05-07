import React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ActionAreaCard({ projectTitle, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/members/${id}`);
  };

  return (
    <Card onClick={handleClick} sx={{ width: 250, marginBottom: "1%", marginLeft: "2%" }}>
      <CardActionArea>
        <div style={{ backgroundColor: '#1565c0', height: 110 }}></div>
        <CardContent>
          <Typography gutterBottom component="div">
            {projectTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
