import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
	const [marca, setMarca] = useState("")
	const [modelo, setModelo] = useState("")
	const [ano, setAno] = useState(0)
	const [proprietario, setProprietario] = useState("")
	const [cor, setCor] = useState("")
	const [id, setId] = useState("")
	const [dados, setdados] = useState([])

	useEffect(() => {
		console.log(marca, modelo, ano, proprietario, cor, id)
	}, [marca, modelo, ano, proprietario, cor, id])

	//POST
	async function registerVehicle(){ 
		await axios.post("http://localhost:3000/inserir",{
			marca, modelo, ano, proprietario, cor
		})
	}
	//PUT
	async function updateVehicle(){ 
		if (!id) {
			console.error("ID do veículo não fornecido");
			return;
		}
		await axios.put(`http://localhost:3000/atualizar/${id}`, {
			marca, modelo, ano, proprietario, cor
		})
	}
	//GET - Todos
	async function getAllVehicle(){ 
		await axios.get("http://localhost:3000/selecionartodos", {
			marca, modelo, ano, proprietario, cor
		})
	}
	//GET - por Id
	async function getVehicleById(){ 
		if (!id) {
			console.error("ID do veículo não fornecido");
			return;
		}
		await axios.get(`http://localhost:3000/selecionarPorId/${id}`, {
			marca, modelo, ano, proprietario, cor
		})
	}
	//GET - por Cor
	async function getVehicleByColor(){ 
		if (!cor) {
			console.error("Cor do veículo não fornecida");
			return;
		}
		await axios.get(`http://localhost:3000/selecionarPorCor/${cor}`, {
			marca, modelo, ano, proprietario, cor
		})
	}
	//GET - por Ano
	async function getVehicleByYear(){ 
		if (!ano) {
			console.error("Cor do veículo não fornecida");
			return;
		}
		await axios.get(`http://localhost:3000/selecionarPorAno/${ano}`, {
			marca, modelo, ano, proprietario, cor
		})
	}
	//DELETE - por ID
	async function deleteVehicleById(){ 
		if (!id) {
			console.error("Cor do veículo não fornecida");
			return;
		}
		await axios.delete(`http://localhost:3000/deletarPorId/${id}`, {
			marca, modelo, ano, proprietario, cor
		})
	}
	//DELETE - por Ano
	async function deleteVehicleByModel(){ 
		if (!modelo) {
			console.error("Cor do veículo não fornecida");
			return;
		}
		await axios.delete(`http://localhost:3000/deletarPorModelo/${modelo}`, {
			marca, modelo, ano, proprietario, cor
		})
	}

	//REGISTRAR
	function handleSubmit(e){
		e.preventDefault()
		registerVehicle()
	}
	//UPDATE
	function handleUpdateSubmit(e) {
		e.preventDefault()
		updateVehicle()
	}
	//SELECIONAR/MOSTRAR TODOS
	function handleGet(e) {
		e.preventDefault()
		getAllVehicle()
	}
	//SELECIONAR/MOSTRAR POR ID
	function handleGetById(e) {
		e.preventDefault()
		getVehicleById()
	}
	//SELECIONAR/MOSTRAR POR COR
	function handleGetByColor(e) {
		e.preventDefault()
		getVehicleByColor()
	}
	//SELECIONAR/MOSTRAR POR ANO
	function handleGetByYear(e) {
		e.preventDefault()
		getVehicleByYear()
	}
	//DELETAR POR ID
	function handleDeletetById(e) {
		e.preventDefault()
		deleteVehicleById()
	}
	//DELETAR POR MODELO
	function handleDeletetByModel(e) {
		e.preventDefault()
		deleteVehicleByModel()
	}

	return (
		<>
			<div className='card'>
				<form>
					<label htmlFor="marca">Marca</label><br />
					<input type="text" id='marca' onChange={(e) => (setMarca(e.target.value))} /><br />

					<label htmlFor="modelo">Modelo</label><br />
					<input type="text" id='modelo' onChange={(e) => (setModelo(e.target.value))} /><br />

					<label htmlFor="ano">Ano</label><br />
					<input type="text" id='ano' onChange={(e) => Number(setAno(e.target.value))} /><br />

					<label htmlFor="proprietario">Proprietário</label><br />
					<input type="text" id='proprietario' onChange={(e) => (setProprietario(e.target.value))} /><br />

					<label htmlFor="cor">Cor</label><br />
					<input type="text" id='cor' onChange={(e) => (setCor(e.target.value))} /><br />
					<br />
					<button type='submit' onClick={handleSubmit}>Registrar Veículo</button>
					<br /><br />
					<label htmlFor="id">ID do Veículo</label><br />
					<input type="text" id='id' onChange={(e) => setId(e.target.value)} /><br />
					<br />
					<button type='submit' onClick={handleUpdateSubmit}>Atualizar Veículo</button>
					<br /><br />
					<button type='submit' onClick={handleGet}>Mostrar Veículos</button>
					<br /><br />
					<button type='submit' onClick={handleGetById}>Mostrar Veículos por ID</button>
					<br /><br />
					<button type='submit' onClick={handleGetByColor}>Mostrar Veículos por Cor</button>
					<br /><br />
					<button type='submit' onClick={handleGetByYear}>Mostrar Veículos por Ano</button>
					<br /><br />
					<button type='submit' onClick={handleDeletetById}>Excluir Veículo por ID</button>
					<br /><br />
					<button type='submit' onClick={handleDeletetByModel}>Excluir Veículo por Modelo</button>
				</form>
			</div>
			<div>
				<ul>
					{/* RESPOSTA */}
				</ul>
			</div>
		</>	
	)
}

export default App
// npm i axios - `gerencia métodos HTTP (Post, Put, Delete, Get)