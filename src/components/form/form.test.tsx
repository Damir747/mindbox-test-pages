import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './form';

describe('Form component', () => {
	test('renders without crashing', () => {
		render(<Form addTask={jest.fn()} />);
		expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
	});

	test('allows the user to input text', () => {
		render(<Form addTask={jest.fn()} />);
		const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;

		fireEvent.change(input, { target: { value: 'New Task' } });
		expect(input.value).toBe('New Task');
	});

	test('calls addTask with the correct argument when form is submitted', () => {
		const addTask = jest.fn();
		render(<Form addTask={addTask} />);

		const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
		const button = screen.getByText('Add');

		fireEvent.change(input, { target: { value: 'New Task' } });
		fireEvent.click(button);

		expect(addTask).toHaveBeenCalledWith('New Task');
	});

	test('clears the input field after form submission', () => {
		const addTask = jest.fn();
		render(<Form addTask={addTask} />);

		const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
		const button = screen.getByText('Add');

		fireEvent.change(input, { target: { value: 'New Task' } });
		fireEvent.click(button);

		expect(input.value).toBe('');
	});
});
