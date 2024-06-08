import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.tsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));


const DATA = [
	{ id: "todo-0", name: "Eat", completed: true },
	{ id: "todo-1", name: "Sleep", completed: false },
	{ id: "todo-2", name: "Walk alone", completed: false },
	{ id: "todo-3", name: "May dig it", completed: false },
	{ id: "todo-4", name: "May not dig it", completed: false },
];

root.render(
	<React.StrictMode>
		<App tasks={DATA} />
	</React.StrictMode>
);

reportWebVitals();
