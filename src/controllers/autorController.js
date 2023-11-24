import NaoEncontrado from "../Erros/erro404.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listarAutores(req, res, next){
    try{
      const listaAutores = autor.find({});

      req.resultado = listaAutores;
      next();
    } catch(erro){
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next){
    try{
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null){
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Não há um autor cadastrado com esse ID"));
      }
    } catch(erro){
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next){
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch(erro){
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next){
    try{
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if (!autorEncontrado){
        next(new NaoEncontrado("Não foi possível atualizar o cadastro, pois o autor não foi localizado"));
      } else{
        res.status(200).json({ message: `Cadastro de ${autorEncontrado.nome} atualizado com sucesso` });  
      }

    } catch(erro){
      next(erro);
    }
  }

  static async excluirAutor(req, res, next){
    try{
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id);

      if (!autorEncontrado){
        next(new NaoEncontrado("Não foi possível localizar o cadastro do autor a ser excluído"));
      } else{
        res.status(200).json({ message: `Cadastro de ${autorEncontrado.nome} excluído com sucesso` });
      }

    } catch(erro){
      next(erro);
    }
  }
}

export default AutorController;