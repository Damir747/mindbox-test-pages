import { render, screen } from '@testing-library/react';
import App from './app.tsx';

test('renders learn react', () => {
	render(<App tasks={[{ id: "todo-0", name: "learn react", completed: true },]} />);
	expect(screen.getByText(/learn react/i)).toBeInTheDocument();

});

// import { render, screen } from '@testing-library/react';
// import App from './app.tsx';

// describe('App', () => {
// 	test('renders App component', () => {
// 		render(<App />);

// 		screen.debug(); // выведет весь DOM
// 	});
// });

// it(`Should App render correctly`, () => {
// 	render(
// 		<App tasks={[{ id: "todo-0", name: "learn react", completed: true },]} />
// 	);
// 	expect(screen.getByText(/learn react/i)).toBeInTheDocument();
// 	expect(screen.getByTestId('list-heading')).toBeInTheDocument();
// 	expect(screen.getByText('todos')).toBeInTheDocument();
// });

function sum(a, b) {
	return a + b;
}
// const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});