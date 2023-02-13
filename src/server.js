import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

// Stateful

// Cabeçalhos (Requisição / Resposta) => Metadados 


// // Formas de enviar requisição
// Query Parameters -> URL Stateful => Filtros, paginação, não-obrigatórios
// // http://localhost:6969/users?userId=1&name=bananaBoy 
// Route Parameters -> Parâmetros não nomeados que também ficam na rota
// // http://localhost:6969/users/1
// Request Body -> Envio de informações de um formulário (HTTPS)
// // http://localhost:6969/users

const server = http.createServer( async (request, response) => {


  await json(request, response);

  const { method, url } = request;

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  });

  if (route) {
    const routeParams = request.url.match(route.path);
    console.log(routeParams);

    return route.handler(request, response);

  }

  return response
    .writeHead("404")
    .end();


});

server.listen(6969);