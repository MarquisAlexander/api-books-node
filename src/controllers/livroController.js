import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
	static async listarLivros(req, res, next) {
		try {
			const listaLivros = await livro.find({});
			res.status(200).json(listaLivros);
		} catch (error) {
			next(error);
		}
	}

	static listarLivroPorId = async (req, res, next) => {
		try {
			const id = req.params.id;

			const livroResultado = await livros
				.findById(id)
				.populate("autor", "nome")
				.exec();

			if (livroResultado !== null) {
				res.status(200).send(livroResultado);
			} else {
				next(new NaoEncontrado("Id do livro não localizado."));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static async cadastrarLivro(req, res, next) {
		const novoLivro = req.body;
		try {
			const autorEncontrado = await autor.findById(novoLivro.autor);
			const livroCompleto = {
				...novoLivro,
				autor: { ...autorEncontrado._doc },
			};
			const livroCriado = await livro.create(livroCompleto);
			res.status(201).json({
				livro: livroCriado,
				message: "livro cadastrado com sucesso",
			});
		} catch (error) {
			next(error);
		}
	}

	static atualizarLivro = async (req, res, next) => {
		try {
			const id = req.params.id;

			const livroResultado = await livros.findByIdAndUpdate(id, {
				$set: req.body,
			});

			if (livroResultado !== null) {
				res.status(200).send({ message: "Livro atualizado com sucesso" });
			} else {
				next(new NaoEncontrado("Id do livro não localizado."));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static excluirLivro = async (req, res, next) => {
		try {
			const id = req.params.id;

			const livroResultado = await livros.findByIdAndDelete(id);

			if (livroResultado !== null) {
				res.status(200).send({ message: "Livro removido com sucesso" });
			} else {
				next(new NaoEncontrado("Id do livro não localizado."));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static async listarLivrosPorEditora(req, res, next) {
		const editora = req.query.editora;
		try {
			const livrosPorEditora = await livro.find({ editora: editora });
			res.status(200).json({ livrosPorEditora });
		} catch (error) {
			next(error);
		}
	}
}

export default LivroController;
