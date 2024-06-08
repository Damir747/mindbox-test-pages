import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterButton from './filter-button';

describe('FilterButton component', () => {
	const setFilterMock = jest.fn();

	beforeEach(() => {
		setFilterMock.mockClear();
	});

	test('renders without crashing', () => {
		render(<FilterButton name="All" isPressed={true} setFilter={setFilterMock} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	test('displays the correct name', () => {
		render(<FilterButton name="Completed" isPressed={false} setFilter={setFilterMock} />);
		expect(screen.getByText('Completed')).toBeInTheDocument();
	});

	test('has the correct aria-pressed attribute', () => {
		render(<FilterButton name="Active" isPressed={true} setFilter={setFilterMock} />);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-pressed', 'true');
	});

	test('calls setFilter with the correct argument when clicked', () => {
		render(<FilterButton name="All" isPressed={false} setFilter={setFilterMock} />);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		expect(setFilterMock).toHaveBeenCalledWith('All');
	});
});
