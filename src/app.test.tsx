import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

describe('Компонент App', () => {
	test('рендерится без ошибок', () => {
		render(<App tasks={[]} />);
		expect(screen.getByText('todos')).toBeInTheDocument();
	});

	test('переключает состояние задачи', () => {
		render(<App tasks={[{ id: '1', name: 'Тестовая задача', completed: false }]} />);
		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	test('удаляет задачу', () => {
		render(<App tasks={[{ id: '1', name: 'Тестовая задача', completed: false }]} />);
		const deleteButton = screen.getByRole('button', { name: /delete/i });
		fireEvent.click(deleteButton);
		expect(screen.queryByText('Тестовая задача')).not.toBeInTheDocument();
	});

	test('редактирует задачу', () => {
		const mockId = 1;
		render(<App tasks={[{ id: '1', name: 'Тестовая задача', completed: false }]} />);
		const editButton = screen.getByTestId('button-edit-1');
		fireEvent.click(editButton);

		// Находим кнопки Save и Cancel по их уникальным идентификаторам
		const saveButton = screen.getByTestId(`button-save-${mockId}`);
		const cancelButton = screen.getByTestId(`button-cancel-${mockId}`);

		// Меняем текст в поле ввода
		const input = screen.getByTestId(`todo-text-${mockId}`);
		fireEvent.change(input, { target: { value: 'Измененная задача' } });

		// Нажимаем на кнопку Save
		fireEvent.click(saveButton);

		expect(screen.queryAllByText('Измененная задача').length).toBe(3);
	});
});
