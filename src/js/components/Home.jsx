import React, { useState, useEffect } from "react";
import "./Style.css";

const Home = () => {
	const [tarea, setTarea] = useState("");
	const [todos, setTodos] = useState([])


	useEffect(() => {
		getTodos();
	}, []);

	//GET de los ToDos
	function getTodos() {
		fetch("https://playground.4geeks.com/todo/users/andreansc")
			.then((response) => {
				console.log(response.ok);
				return response.json()
			})
			.then((data) => {
				console.log("data", data);
				setTodos(data.todos)
			})
			.catch((err) => console.error("Error:", err));

	}

	//POST de los ToDos

	function createTodo(label = "Tarea genérica") {
		fetch("https://playground.4geeks.com/todo/todos/andreansc", {
			method: "POST",
			body: JSON.stringify({ label: label, is_done: false }),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				getTodos(); // Recarga los todos desde el servidor
			})
			.catch((err) => console.error("Error:", err));
	}


	const clickEnter = (event) => {
		if (event.key === "Enter" && tarea.trim() !== "") {
			createTodo(tarea.trim());
			setTarea("");
		}
	};


	const eliminarTarea = (index) => {
		const id = todos[index].id;
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
			.then(() => getTodos())
			.catch((err) => console.error("Error al eliminar:", err));
	};


	return (

		<div className="text-center container">
			<h1 className="text-center mt-5 titulo">todos</h1>

			<div className="d-flex justify-content-center">
				<input
					className="form-control w-50"
					placeholder="Ingresa una nueva tarea"
					value={tarea}
					onChange={(event) => setTarea(event.target.value)}
					onKeyDown={clickEnter}
				/>
			</div>

			<div className="d-flex justify-content-center">
				<ul className="list-group mt-3 w-50">
					{todos.map((item, index) => (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between align-items-center tarea-item"
						>
							<span>{item.label ?? item}</span>
							<button
								className="btn btn-sm eliminar-btn"
								onClick={() => eliminarTarea(index)}
							>
								X
							</button>
						</li>
					))}
				</ul>
			</div>

		</div>
	);
};

export default Home;

