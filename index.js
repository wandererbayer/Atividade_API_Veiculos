const express = require('express')
const app = express()

app.use(express.json())

const port = 3000
let listaVeiculos = []

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})

app.post("/cadastrar", (req, res) =>{
    const {marca, modelo, ano, proprietario, cor} = req.body
    listaVeiculos.push({marca, modelo, ano, proprietario, cor})
    res.send(`Veículo recebido: ${marca, modelo}`)
})

app.get('/selecionartodos', (req, res) =>{
    res.send(listaVeiculos)
})

app.get('/selecionarPorId/:id', (req, res) =>{
    const {id} = req.params
    const index = parseInt(id)

    if (index >= 0 && index < listaVeiculos.length) 
    {
        res.send(listaVeiculos[index])
    }
    else
    {
        res.send('Veículo não encontrado.')
    }
})

app.get('/selecionarPorAno/:ano', (req, res) =>{ //https://www.geeksforgeeks.org/javascript-array-filter-method/?ref=gcse_ind
    const {ano} = req.params
    const veiculosPorAno = listaVeiculos.filter(veiculo => veiculo.ano == ano);  
    
    if (veiculosPorAno.length > 0)
    {
        res.send(veiculosPorAno)
    }
    else
    {
        res.send('Veículo não encontrado.')
    }
})

app.get('/selecionarPorCor/:cor', (req, res) => {  
    const {cor} = req.params 
    const veiculosPorCor = listaVeiculos.filter(veiculo => veiculo.cor.toLowerCase() === cor.toLowerCase())
    //https://www.geeksforgeeks.org/javascript-string-tolowercase-method/?ref=gcse_ind
    
    if (veiculosPorCor.length > 0) 
    {
        res.send(veiculosPorCor)
    }
    else
    {  
        res.send('Veículo não encontrado.')
    }  
});  

app.put('/atualizar/:id', (req, res) =>{
    const {id} = req.params
    const {marca, modelo, ano, proprietario, cor} = req.body
    const index = parseInt(id)

    if (index >= 0 && index < listaVeiculos.length) 
    {
        listaVeiculos[index] = {marca, modelo, ano, proprietario, cor}
        res.send(`Veículo ${id} atualizado com sucesso.`)
    }
    else
    {
        res.send('Veículo não encontrado.')
    }
})

app.delete('/deletarPorId/:id', (req, res) =>{
    const {id} = req.params
    listaVeiculos.splice(id, 1)
    res.send(` ${id} removido.`)
})

app.delete('/deletarPorModelo/:modelo', (req, res) =>{
    const {modelo} = req.params
    const index = listaVeiculos.findIndex(veiculo => veiculo.modelo.toLowerCase() === modelo.toLowerCase());  

    if (index > -1) 
    {  
        listaVeiculos.splice(index, 1)
        res.send(`Veículo modelo ${modelo} removido.`)
    }
    else 
    {  
            res.send('Veículo não encontrado.')
    }
})