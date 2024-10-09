import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
	console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
	console.log("Conexão com o MongoDB realizada com sucesso");
});

const app = express();
app.use(express.json());

const livros = [
	{ id: 1, titulo: "O Senhor dos Anéis" },
	{ id: 2, titulo: "O Hobbit" },
];

function buscarLivros(id) {
	return livros.findIndex((livro) => {
		return livro.id === Number(id);
	});
}

app.get("/", (req, res) => {
	res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
	res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
	const indexLivroEncontrado = buscarLivros(req.params.id);
	res.status(200).json(livros[indexLivroEncontrado]);
});

app.post("/livros", (req, res) => {
	const novoLivro = req.body;
	livros.push({
		id: livros.length + 1,
		titulo: novoLivro.titulo,
	});
	res.status(201).send("livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
	const indexLivroEncontrado = buscarLivros(req.params.id);
	livros[indexLivroEncontrado].titulo = req.body.titulo;
	res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
	const indexLivroEncontrado = buscarLivros(req.params.id);
	livros.splice(indexLivroEncontrado, 1);
	res.status(200).send("Livro excluído com sucesso");
});

export default app;
