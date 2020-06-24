const express = require('express');
const Database = require('./database/database');
const Games = require('./database/games');
const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CRIANDO ENDOPOINST = SÃO ROTAS DA API 

app.get('/games', (req, res) => {
    //Passando o status code 
    res.statusCode = 200;
    res.json(bd.games);
    //console.log(bd.games);
})


// SISTEMA DE CADASTRO VIA API 
app.post("/games", (req, res) => {
    //precisamos dos dados title, ano e preco 

      // pegando os dados atráves da req post 
      // req.body.nomedado
    
    var { title, price, year } = req.body;
     
    bd.games.push({
        id: 199,
        title,
        price, 
        year
    });

    // Se ocorreu tudo certo vamos retornar algo 
    res.sendStatus(200);
    

})


// rota de cadastro de registro único
app.get('/games/:id', (req, res) => {
    // VOU PASSAR O ID QUE EU QUERO E ELE VAI TRAZER OS DADOS NO GAME 
         // lógica de pegar o game no banco de dados
     //  let id = req.params.id;
    
       // VERIFICANDO SE O ID É UM NUMRO
    if (isNaN(req.params.id)) { 
        res.statusCode(400); // ERRO
    }
    else {
        // vou filtrar 
          // converter o id que é um texto para int
        var id = parseInt(req.params.id);
        

        //filtrando no bd
        let game = bd.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
})


// Criando endpoint para deleção de games, ele só é acessível por bibliotecas com axios e ajax 
   // Deletando coisas na api rest
app.delete('/games/:id', (req, res) => {
    // Usando a validação 
       // Verificar se de fato o dado colocado é um numero
    if (isNaN(req.params.id)) { // Aqui é o ID não é um numero
        res.sendStatus(400);   
    } 
    else {
            // Transformando ID em um número inteiro
        let id = parseInt(req.params.id);
        // Pegando o index do elemento que eu quero remover de games
        let index = bd.games.findIndex(g => g.id == id);
  
         // Fazendo outra validação 
            // Se o elemento for igual a -1, ele é inválido
        if (index == -1) {
               // O elemento não existe 
               res.statusCode(404) 
        }
        else {
            // Deletando o elemento
            bd.games.splice(index, 1);
            res.sendStatus(200);
        }

    }
})



// O método PUT ele faz o mesmo que o get e o post faz, ou seja ele é uma mistura. 
  // Para editar vamos usar o método PUT 

app.put('/games/:id', (req, res) => {
          // VERIFICANDO SE O ID É UM NUMRO
    if (isNaN(req.params.id)) { 
        res.statusCode(400); // ERRO
    }
    else {
        // se o ID FOR VÁLIDO VAMOS
        // vou filtrar 
          // e converter o ID
        var id = parseInt(req.params.id);
        

        //PROCURA Na variavel bd ALGUM GAME QUE TEM ESSE ID 
        let game = bd.games.find(g => g.id == id);
         
         
        if (game != undefined) {
           
            // PEGANDO OS DADOS QUE vem do corpo da requisição 
            let { title, price, year } = req.body;


            // Passei novos valores, mostrando a edição. 

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);
        } else {
            // JOGO NÃO FOI ACHADO 
            res.sendStatus(404);
        }
    }
    

})


app.listen(4002, (req, res) => {
    console.log("API RODANDO");
})