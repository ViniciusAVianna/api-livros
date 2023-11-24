import AutorInvalido from "../Erros/autor-invalido.js";
import NaoEncontrado from "../Erros/erro404.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next){
    try{
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;

      next();
    } catch(erro){
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next){
    try{
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (!livroEncontrado){
        next(new NaoEncontrado("Não há um livro cadastrado com esse ID"));
      } else {
        res.status(200).json(livroEncontrado);
      }
    } catch(erro){
      next(erro);
    }
  }

  static async listarLivrosPorFiltro(req, res, next){
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;
    let busca = {};

    if (editora) busca.editora = editora;

    // //método de busca "flexível" usando regex com JS "puro"
    // const regexTitulo = new RegExp(titulo, "i");
    // if (titulo) busca.titulo = regexTitulo;

    //método de busca "flexível" usando regex com funcionalidade nativa do mongoose
    if (titulo) busca.titulo = { $regex: titulo, $options: "i"};

    if (minPaginas || maxPaginas) busca.paginas = {};

    if(minPaginas) busca.paginas.$gte = minPaginas;
    if(maxPaginas) busca.paginas.$lte = maxPaginas;

    if (nomeAutor){
      const autorEncontrado = await autor.findOne({nome: nomeAutor});

      if (!autorEncontrado){
        busca = null;
      } else{
        const idAutor = autorEncontrado._id;
        console.log(idAutor);
        busca.autor = idAutor;
      }
    }
    
    try{
      let livrosFiltrados;
      if (busca === null){
        next(new NaoEncontrado("Nenhum resultado para esta busca"));
      } else{
        livrosFiltrados = livro.find(busca);
        req.resultado = livrosFiltrados;
      }
      
      next();

    } catch(erro){
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next){
    const novoLivro = req.body;
    try{
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado){
        next(new AutorInvalido);
      } else{
        const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
      }

    } catch(erro){
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next){
    try{
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);

      if (!livroEncontrado){
        next(new NaoEncontrado("Não foi possível atualizar o cadastro, pois o livro não foi localizado"));
      } else{
        res.status(200).json({ message: "Livro atualizado" });
      }

    } catch(erro){
      next(erro);
    }
  }

  static async excluirLivro(req, res, next){
    try{
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);

      if (!livroEncontrado){
        next(new NaoEncontrado("Não foi possível localizar o cadastro do livro a ser excluído"));
      } else{
        res.status(200).json({ message: "Livro excluído com sucesso" });
      }

    } catch(erro){
      next(erro);
    }
  }
}

export default LivroController;