import React, { useState, useRef, useEffect, ReactElement } from 'react';
import '../src/app.css';
import FilterButton from './components/filter-button/filter-button';
import Form from './components/form/form';
import Todo from './components/todo/todo';
import { getIdNumber } from '../src/utils/utils';

interface Task {
	id: string;
	name: string;
	completed: boolean;
}

interface AppProps {
	tasks: Task[];
}

function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

const FILTER_MAP: Record<string, (task: Task) => boolean> = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const App: React.FC<AppProps> = (props) => {
	const listHeadingRef = useRef<HTMLDivElement>(null);

	const [tasks, setTasks] = useState<Task[]>(props.tasks);
	const [filter, setFilter] = useState<string>("All");

	function addTask(name: string): void {
		const newTask: Task = { id: `todo-${getIdNumber(tasks)}`, name, completed: false };
		setTasks([...tasks, newTask]);
	}

	function toggleTaskCompleted(id: string): void {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function deleteTask(id: string): void {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}

	function editTask(id: string, newName: string): void {
		const editedTaskList = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name: newName };
			}
			return task;
		});
		setTasks(editedTaskList);
	}

	function clearCompleted(): void {
		setTasks([...tasks.filter(el => !el.completed)]);
	}

	const taskList: ReactElement[] = tasks
		.filter(FILTER_MAP[filter])
		.map((task) => (
			<Todo
				id={task.id}
				name={task.name}
				completed={task.completed}
				key={task.id}
				toggleTaskCompleted={toggleTaskCompleted}
				deleteTask={deleteTask}
				editTask={editTask}
			/>
		));

	const filterList: ReactElement[] = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	const itemsNoun = taskList.length !== 1 ? "items" : "item";
	const headingText = `${taskList.length} ${itemsNoun} left`;
	const prevTaskLength = usePrevious(tasks.length);

	useEffect(() => {
		if (tasks.length < (prevTaskLength ?? 0)) {
			listHeadingRef.current?.focus();
		}
	}, [tasks.length, prevTaskLength]);

	return (
		<div className="todoapp stack-large">
			<div className='header'>
				<h1>todos</h1>
				<Form addTask={addTask} />
			</div>
			<ul className="todo-list stack-large stack-exception">
				{taskList}
			</ul>
			<footer className='footer'>
				<div id="list-heading" tabIndex={-1} ref={listHeadingRef}>
					{headingText}
				</div>
				<div className='filters-div'>
					<div className="filters btn-group stack-exception">
						{filterList}
					</div>
				</div>
				<button
					id={`button-clear-completed`}
					data-testid={`button-clear-completed`}
					type="button"
					className="btn todo-clear-completed"
					onClick={clearCompleted}>Clear completed</button>
			</footer>
		</div>
	);
}

export default App;
