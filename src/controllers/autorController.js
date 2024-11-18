import NaoEncontrado from "../erros/naoEncontrado.js";
import { autor } from "../models/Autor.js";

class AutorController {
	static async listarAutores(req, res) {
		try {
			const listaAutores = await autor.find({});
			res.status(200).json(listaAutores);
		} catch (error) {
			res.status(500).json({
				message: `${error.message} - falha ao pegar lista de autores`,
			});
		}
	}

	static async listarAutorPorId(req, res, next) {
		try {
			const id = req.params.id;
			const autorEncontrado = await autor.findById(id);

			if (autorEncontrado !== null) {
				res.status(200).json(autorEncontrado);
			} else {
				next(new NaoEncontrado(`Id do autor não localizado`));
			}
		} catch (error) {
			next(error);
		}
	}

	static async cadastrarAutor(req, res, next) {
		try {
			const novoAutor = await autor.create(req.body);
			res.status(201).json({
				autor: novoAutor,
				message: "autor cadastrado com sucesso",
			});
		} catch (error) {
			next(error);
		}
	}

	static atualizarAutor = async (req, res, next) => {
		try {
			const id = req.params.id;

			const autorResultado = await autores.findByIdAndUpdate(id, {
				$set: req.body,
			});

			if (autorResultado !== null) {
				res.status(200).send({ message: "Autor atualizado com sucesso" });
			} else {
				next(new NaoEncontrado("Id do Autor não localizado."));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static excluirAutor = async (req, res, next) => {
		try {
			const id = req.params.id;

			const autorResultado = await autores.findByIdAndDelete(id);

			if (autorResultado !== null) {
				res.status(200).send({ message: "Autor removido com sucesso" });
			} else {
				next(new NaoEncontrado("Id do Autor não localizado."));
			}
		} catch (erro) {
			next(erro);
		}
	};
}

export default AutorController;
