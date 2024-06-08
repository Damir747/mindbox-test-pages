import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import './todo.css';

interface TodoProps {
	id: string;
	name: string;
	completed: boolean;
	editTask: (id: string, newName: string) => void;
	toggleTaskCompleted: (id: string) => void;
	deleteTask: (id: string) => void;
}

function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

const Todo: React.FC<TodoProps> = (props) => {
	const [isEditing, setEditing] = useState<boolean>(false);
	const [newName, setNewName] = useState<string>("");
	const editFieldRef = useRef<HTMLInputElement>(null);
	const editButtonRef = useRef<HTMLButtonElement>(null);
	const wasEditing = usePrevious(isEditing);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setNewName(e.target.value);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		props.editTask(props.id, newName);
		setNewName("");
		setEditing(false);
	}

	const editingTemplate = (
		<form className="stack-small" onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="todo-label" htmlFor={props.id}>
					New name for {props.name}
				</label>
				<input
					id={props.id}
					className="todo-text"
					type="text"
					value={newName}
					onChange={handleChange}
					ref={editFieldRef}
					data-testid={`todo-text-${props.id}`}
				/>
			</div>
			<div className="btn-group">
				<button
					id={`button-cancel-${props.id}`}
					data-testid={`button-cancel-${props.id}`}
					type="button"
					className="btn todo-cancel"
					onClick={() => setEditing(false)}
				>
					Cancel
					<span className="visually-hidden">renaming {props.name}</span>
				</button>
				<button
					id={`button-save-${props.id}`}
					data-testid={`button-save-${props.id}`}
					type="submit"
					className="btn btn__primary todo-edit">
					Save
					<span className="visually-hidden">new name for {props.name}</span>
				</button>
			</div>
		</form>
	);

	const viewTemplate = (
		<div className="stack-small">
			<div className="c-cb">
				<input
					id={props.id}
					type="checkbox"
					defaultChecked={props.completed}
					onChange={() => props.toggleTaskCompleted(props.id)}
				/>
				<label className="todo-label" htmlFor={props.id}>
					{props.name}
				</label>
			</div>
			<div className="btn-group">
				<button
					id={`button-edit-${props.id}`}
					data-testid={`button-edit-${props.id}`}
					type="button"
					className="btn"
					onClick={() => setEditing(true)}
					ref={editButtonRef}
				>
					Edit <span className="visually-hidden">{props.name}</span>
				</button>
				<button
					id={`button-delete-${props.id}`}
					data-testid={`button-delete-${props.id}`}
					type="button"
					className="btn btn__danger"
					onClick={() => props.deleteTask(props.id)}
				>
					Delete <span className="visually-hidden">{props.name}</span>
				</button>
			</div>
		</div>
	);

	useEffect(() => {
		if (!wasEditing && isEditing) {
			editFieldRef.current?.focus();
		} else if (wasEditing && !isEditing) {
			editButtonRef.current?.focus();
		}
	}, [wasEditing, isEditing]);

	return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
};

export default Todo;
