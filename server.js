import http from "http";

const PORT = 3000;

const rotas = {
	"/": "Curso de Node",
	"/livros": "Entrei em livros",
	"/autores": "Entrei em autores"
};

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		"Content-Type": "text/plain",
	});
	res.end(rotas[req.url]);
});

server.listen(PORT, () => {
	console.log("Server rodando na porta 3000");
});
