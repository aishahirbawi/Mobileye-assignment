import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import './JobList.css';

const JobList = ({ jobs, onJobClick }) => {
  return (
    <List className="job-list">
      {jobs.map((job) => (
        <ListItem
          key={job.id}
          className="job-item"
          button
          onClick={() => onJobClick(job)}
        >
          <ListItemText
            primary={job.cliCommand}
            secondary={`Status: ${job.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default JobList;
