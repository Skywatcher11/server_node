//# servidor nodejs

// Importa os pacotes necessários
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
// atribui a app uma função
const app = express();
// falamos para o app/express utilizar um formato json para o corpo
app.use(express.json());
// falamos para o app/express utilizar o cors e o morgan em sua execução
app.use(cors());
app.use(morgan('dev'));
// inicia o servidor escutando por requisições na porta 3000
app.listen(3000, () => {
    console.warn("Servidor escutando na porta 3000");
})
// rota :GET /
app.get('/', (request, response) => {
    try {
        // Lê de forma síncrona o arquivo json, como string
        const data = fs.readFileSync(dbPath, 'utf8',)
        // transforma a string em json
        const facts = JSON.parse(data)
        // retorna o json para o usuário com status 200
        return response.status(200).json(facts)
    } catch (e) {
        // print mensagem de erro no terminal
        console.log(e)
        // retorna mensagem de erro para o usuário com status 500
        return response.status(500).json({ erro: 'Erro de execução!' })
    }
})
// rota :GET /:id
// ouve requisições com metodo GET com um parâmetro
app.get('/:id', (request, response) => {
    // pega o ID requisição
    const { id } = request.params
    try {
        // Lê de forma síncrona o arquivo json, como string
        let data = fs.readFileSync(dbPath, 'utf8')
        // inicializa uma variável nula
        let fact = null
        // transforma a string em json e pega o array facts
        data = JSON.parse(data)['facts']
        // passa por todos os fatos
        for (let index in data) {
            // se encontrar um fato com o mesmo ID que o usuário pediu
            if (data[index]['id'] == id) {
                // a variavel fact recebe o fato com ID
                fact = data[index]
                // para o loop
                break
            }
        }
        // caso a variável não tenha recebido nenhum fato
        if (fact === null) {
            // retorne uma mensagem de erro com o status 400
            return response
                .status(404)
                .json({ erro: 'Nenhum fato foi encontrado!' })
        }
        // retorne o fato encontrado para o usuário
        return response.json(fact)
    } catch (e) {
        // print do erro no terminal
        console.log(e)
        // retorne uma mensagem de erro com o status 500
        return response
            .status(500).json({
                erro: 'Não foi possível executar esta operação!' })
}
});
// ouve requisições com metodo POST
app.post('/', (request, response) => {
    // lê o campo text do corpo da requisição
    const { text } = request.body
    try {
        // Lê de forma síncrona o arquivo json, como string
        let data = fs.readFileSync(dbPath, 'utf8')
        // transforma a string em json
        data = JSON.parse(data)
        // cria um novo fato
        const newFact = {
            id: String(data['facts'].length + 1),
            text: text,
            type: 'cat',
            upvotes: 0,
        }
        // adiciona o fato ao array de fatos
        data['facts'].push(newFact)
        // sobrescreve o arquivo
        fs.writeFileSync(dbPath, JSON.stringify(data))
        // retorna o fato criado ao usuário com o status 201
        return response.json(newFact)
    } catch (e) {
        console.log(e)
        // retorne uma mensagem de erro com o status 500
        return response.status(500).json({
            erro: 'Não foi possível executar esta operação!' })
}
})