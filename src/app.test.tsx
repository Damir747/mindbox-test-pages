import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

describe('App component', () => {
	test('renders without crashing', () => {
		render(<App tasks={[]} />);
		expect(screen.getByText('todos')).toBeInTheDocument();
	});

	test('adds a new task', () => {
		render(<App tasks={[]} />);
		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'New Task' } });
		fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
		expect(screen.getByText('New Task')).toBeInTheDocument();
	});

	test('toggles task completion', () => {
		render(<App tasks={[{ id: '1', name: 'Test Task', completed: false }]} />);
		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	test('deletes a task', () => {
		render(<App tasks={[{ id: '1', name: 'Test Task', completed: false }]} />);
		const deleteButton = screen.getByRole('button', { name: /delete/i });
		fireEvent.click(deleteButton);
		expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
	});

	test('edits a task', () => {
		render(<App tasks={[{ id: '1', name: 'Test Task', completed: false }]} />);
		const editButton = screen.getByRole('button', { name: /edit/i });
		fireEvent.click(editButton);
		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'Edited Task' } });
		fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
		expect(screen.getByText('Edited Task')).toBeInTheDocument();
	});

});
