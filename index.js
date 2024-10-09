const express = require('express')
const app = express()
const db = require('./db')

app.use(express.json())

const port = 3000
let listaVeiculos = []

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})

//app.post("/cadastrar", (req, res) =>{
//    const {marca, modelo, ano, proprietario, cor} = req.body
//    listaVeiculos.push({marca, modelo, ano, proprietario, cor})
//    res.send(`Veículo recebido: ${marca, modelo}`)
//})

app.post('/inserir', (req,res)=>{
    const {marca, modelo, ano, proprietario, cor} = req.body

    db.query(
        `INSERT INTO veiculos (marca, modelo, ano, proprietario, cor) VALUES (?, ?, ?, ?, ?)`,
        [marca, modelo, Number(ano), proprietario, cor],
        function(err, results, fields){
            if(err){
                console.error('Erro na inserção', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`Veículo inserido: \n\nMarca: ${marca} \nModelo: ${modelo} \nAno: ${ano} \nProprietário: ${proprietario} \nCor: ${cor}`)
})

//app.get('/selecionartodos', (req, res) =>{
//    res.send(listaVeiculos)
//})

app.get('/selecionartodos', (req, res) =>{
    db.query(
        `SELECT * FROM veiculos`,
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar veículos'});
            }
            return res.json(results);
        }
    );
})


//app.get('/selecionarPorId/:id', (req, res) =>{
//    const {id} = req.params
//    const index = parseInt(id)
//
//    if (index >= 0 && index < listaVeiculos.length) 
//    {
//        res.send(listaVeiculos[index])
//    }
//    else
//    {
//        res.send('Veículo não encontrado.')
//    }
//})

app.get('/selecionarPorId/:id', (req, res) =>{
    const {id} = req.params
    db.query(
        `SELECT * FROM veiculos WHERE id = ?`,
        [id],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar veículos'});
            }
            return res.json(results);
        }
    );
})

//app.get('/selecionarPorAno/:ano', (req, res) =>{ //https://www.geeksforgeeks.org/javascript-array-filter-method/?ref=gcse_ind
//    const {ano} = req.params
//    const veiculosPorAno = listaVeiculos.filter(veiculo => veiculo.ano == ano);  
//    
//    if (veiculosPorAno.length > 0)
//    {
//        res.send(veiculosPorAno)
//    }
//    else
//    {
//        res.send('Veículo não encontrado.')
//    }
//})

app.get('/selecionarPorAno/:ano', (req, res) =>{
    const {ano} = req.params
    db.query(
        `SELECT * FROM veiculos WHERE ano = ?`,
        [ano],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar veículos'});
            }
            return res.json(results);
        }
    );
})

//app.get('/selecionarPorCor/:cor', (req, res) => {  
//    const {cor} = req.params 
//    const veiculosPorCor = listaVeiculos.filter(veiculo => veiculo.cor.toLowerCase() === cor.toLowerCase())
//    //https://www.geeksforgeeks.org/javascript-string-tolowercase-method/?ref=gcse_ind
//    
//    if (veiculosPorCor.length > 0) 
//    {
//        res.send(veiculosPorCor)
//    }
//    else
//    {  
//        res.send('Veículo não encontrado.')
//    }  
//});

app.get('/selecionarPorCor/:cor', (req, res) =>{
    const {cor} = req.params
    db.query(
        `SELECT * FROM veiculos WHERE cor = ?`,
        [cor],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar veículos'});
            }
            return res.json(results);
        }
    );
})

//app.put('/atualizar/:id', (req, res) =>{
//    const {id} = req.params
//    const {marca, modelo, ano, proprietario, cor} = req.body
//    const index = parseInt(id)
//
//    if (index >= 0 && index < listaVeiculos.length) 
//    {
//        listaVeiculos[index] = {marca, modelo, ano, proprietario, cor}
//        res.send(`Veículo ${id} atualizado com sucesso.`)
//    }
//    else
//    {
//        res.send('Veículo não encontrado.')
//    }
//})

app.put('/atualizar/:id', (req, res) =>{
    const {id} = req.params
    const {marca, modelo, ano, proprietario, cor} = req.body
    db.query(
        `UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, proprietario = ?, cor = ? WHERE id = ?`,
        [marca, modelo, Number(ano), proprietario, cor, id],
        function(err, results, fields){
            if(err){
                console.error('Erro ao atualizar', err);
                return;
            }
            console.log(results);
            console.log(fields);
        })
    
    res.send(`Veículo inserido: \n\nMarca: ${marca} \nModelo: ${modelo} \nAno: ${ano} \nProprietário: ${proprietario} \nCor: ${cor}`)
});


//app.delete('/deletarPorId/:id', (req, res) =>{
//    const {id} = req.params
//    listaVeiculos.splice(id, 1)
//    res.send(` ${id} removido.`)
//})

app.delete('/deletarPorId/:id', (req, res) =>{
    const id = req.params.id
    db.query(
        `DELETE FROM veiculos WHERE id = ?`,
        [id],
        function(err, results, fields){
            if(err){
                console.error('Erro ao excluir', err);
                return res.status(500).json({error: 'Erro ao excluir veículos'});
            }
            return res.json(results);
        }
    );
})

//app.delete('/deletarPorModelo/:modelo', (req, res) =>{
//    const {modelo} = req.params
//    const index = listaVeiculos.findIndex(veiculo => veiculo.modelo.toLowerCase() === modelo.toLowerCase());  
//
//    if (index > -1) 
//    {  
//        listaVeiculos.splice(index, 1)
//        res.send(`Veículo modelo ${modelo} removido.`)
//    }
//    else 
//    {  
//            res.send('Veículo não encontrado.')
//    }
//})

app.delete('/deletarPorModelo/:modelo', (req, res) =>{
    const modelo = req.params.modelo
    db.query(
        `DELETE FROM veiculos WHERE modelo = ?`,
        [modelo],
        function(err, results, fields){
            if(err){
                console.error('Erro ao excluir', err);
                return res.status(500).json({error: 'Erro ao excluir veículos'});
            }
            return res.json(results);
        }
    );
})