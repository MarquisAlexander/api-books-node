import livro from "../models/Livro.js";

class LivroController {
	static async listarLivros(req, res) {
		try {
			const listaLivros = await livro.find({});
			res.status(200).json(listaLivros);
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - falha ao pegar lista de livros` });
		}
	}

	static async listarLivroPorId(req, res) {
		try {
			const id = req.params.id;
			const livroEncontrado = await livro.findById(id);
			res.status(200).json(livroEncontrado);
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - falha ao pegar livro` });
		}
	}

	static async cadastrarLivro(req, res) {
		try {
			const novoLivro = await livro.create(req.body);
			res.status(201).json({
				livro: novoLivro,
				message: "livro cadastrado com sucesso",
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - falha ao cadastrar livro` });
		}
	}

	static async atualizarLivro(req, res) {
		try {
			const id = req.params.id;
			await livro.findByIdAndUpdate(id);
			res.status(200).json({ message: "Livro atualizado com sucesso" });
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - falha ao atualizar livro` });
		}
	}

	static async excluirLivro(req, res) {
		try {
			const id = req.params.id;
			await livro.findByIdAndDelete(id);
			res.status(200).json({ message: "Livro excluído com sucesso" });
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - falha ao deletar livro` });
		}
	}
}

export default LivroController;