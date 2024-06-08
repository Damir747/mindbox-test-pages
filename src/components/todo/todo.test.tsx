import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from './todo';
describe('Todo component', () => {
	const mockEditTask = jest.fn();
	const mockToggleTaskCompleted = jest.fn();
	const mockDeleteTask = jest.fn();
	const todoProps = {
		id: '1',
		name: 'Test Task',
		completed: false,
		editTask: mockEditTask,
		toggleTaskCompleted: mockToggleTaskCompleted,
		deleteTask: mockDeleteTask,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders without crashing', () => {
		render(<Todo {...todoProps} />);
		expect(screen.queryAllByText('Test Task').length).toBe(3);
	});

	test('exits editing mode when Cancel button is clicked', () => {
		render(<Todo {...todoProps} />);
		fireEvent.click(screen.getByText('Edit'));
		fireEvent.click(screen.getByText('Cancel'));
		expect(screen.queryAllByText('Test Task').length).toBe(3);
	});

	test('enters editing mode when Edit button is clicked', () => {
		render(<Todo {...todoProps} />);
		const editButton = screen.getByText('Edit');
		fireEvent.click(editButton);
		expect(screen.getByText(`New name for ${todoProps.name}`)).toBeInTheDocument();
	});

	test('calls editTask with the correct arguments when form is submitted', () => {
		render(<Todo {...todoProps} />);
		fireEvent.click(screen.getByText('Edit'));

		const input = screen.getByDisplayValue('');
		fireEvent.change(input, { target: { value: 'Updated Task' } });

		fireEvent.click(screen.getByText('Save'));
		expect(mockEditTask).toHaveBeenCalledWith('1', 'Updated Task');
	});

});
