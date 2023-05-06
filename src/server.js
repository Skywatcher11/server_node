//# servidor nodejs

// Importa os pacotes necessários
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
// atribui a app uma função
const app = express();
// falamos para o app/express utilizar um formato json para o corpo
app.use(express.json());
// falamos para o app/express utilizar o cors e o morgan em sua execução
app.use(cors());
app.use(morgan('dev'));
// inicia o servidor escutando por requisições na porta 3000
app.listen(3000, ()=> {
console.warn("Servidor escutando na porta 3000");
})
// rota :GET /
app.get('/', (request, response) => {
    try{
    // Lê de forma síncrona o arquivo json, como string
    const data = fs.readFileSync(dbPath,'utf8',)
    // transforma a string em json
    const facts = JSON.parse(data)
    // retorna o json para o usuário com status 200
    return response.status(200).json(facts)
    } catch (e) {
    // print mensagem de erro no terminal
    console.log(e)
    // retorna mensagem de erro para o usuário com status 500
    return response.status(500).json({erro: 'Erro de execução!'})
    }
})
