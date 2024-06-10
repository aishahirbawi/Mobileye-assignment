import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobList from './components/JobList/JobList';

const jobs = [
    { id: 1, cliCommand: 'python /home/user/train.py', status: 'Running' },
    { id: 2, cliCommand: 'python /home/user/test.py', status: 'Succeeded' },
];

test('renders job list', () => {
    render(<JobList jobs={jobs} onJobClick={() => { }} />);
    const jobItems = screen.getAllByRole('button');
    expect(jobItems).toHaveLength(2);
});

test('calls onJobClick when a job is clicked', () => {
    const handleJobClick = jest.fn();
    render(<JobList jobs={jobs} onJobClick={handleJobClick} />);
    const jobItem = screen.getByText('python /home/user/train.py');
    fireEvent.click(jobItem);
    expect(handleJobClick).toHaveBeenCalledWith(jobs[0]);
});
