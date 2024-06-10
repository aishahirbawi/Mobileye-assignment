import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './JobDetails.css';

const JobDetails = ({ job }) => {
    if (!job) return <h3>Select a job to see details</h3>;

    return (
        <Card className="job-details">
            <CardContent>
                <Typography variant="h5" component="div">
                    {job.cliCommand}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Status: {job.status}
                </Typography>
                <Typography variant="body2">
                    User: {job.user}
                    <br />
                    Group: {job.group}
                    <br />
                    Date Submitted: {job.dateSubmitted}
                    <br />
                    Date Completed: {job.dateCompleted || 'N/A'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default JobDetails;
