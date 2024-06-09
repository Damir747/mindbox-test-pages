import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.tsx';
import reportWebVitals from './reportWebVitals';
import { DATA } from './mock/mock.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App tasks={DATA} />
	</React.StrictMode>
);

reportWebVitals();
