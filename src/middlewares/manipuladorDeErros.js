import mongoose from "mongoose";
import ErroBase from "../Erros/erro-base.js";
import RequisicaoIncorreta from "../Erros/requisicao-incorreta.js";
import ErroValidacao from "../Erros/erro-validacao.js";

// eslint-disable-next-line no-unused-vars
export default function manipularErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError){
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarResposta(res);
  } else{
    new ErroBase().enviarResposta(res);
  }
}
