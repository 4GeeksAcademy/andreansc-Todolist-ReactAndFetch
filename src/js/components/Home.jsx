import React, { useState } from "react";
import "./Style.css";

const Home = () => {
	const [tarea, setTarea] = useState("");
	const [todos, setTodos] = useState([]);

	const clickEnter = (event) => {
		if (event.key === "Enter" && tarea.trim() !== "") {
			setTodos([...todos, tarea]);
			setTarea("");
		}
	};

	const eliminarTarea = (index) => {
		const nuevasTareas = todos.filter((_, i) => i !== index);
		setTodos(nuevasTareas);
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
							<span>{item}</span>
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

