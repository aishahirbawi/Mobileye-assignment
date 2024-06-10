// JobDetails.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import JobDetails from './components/JobDetails/JobDetails';

const job = {
    id: 1,
    cliCommand: 'python /home/user/train.py',
    status: 'Running',
    user: 'John Doe',
    group: 'Data Science',
    dateSubmitted: '2024-06-09T12:00:00',
    dateCompleted: null,
};

test('renders job details', () => {
    render(<JobDetails job={job} />);
    expect(screen.getByText('python /home/user/train.py')).toBeInTheDocument();
    expect(screen.getByText('Status: Running')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
        return content.includes('Date Submitted: 2024-06-09T12:00:00');
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
        return content.includes('Date Completed: N/A');
    })).toBeInTheDocument(); // Ensure the "Date Completed" text is present
});

test('renders placeholder when no job is selected', () => {
    render(<JobDetails job={null} />);
    expect(screen.getByText('Select a job to see details')).toBeInTheDocument();
});
