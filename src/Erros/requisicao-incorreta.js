import ErroBase from "./erro-base.js";

class RequisicaoIncorreta extends ErroBase{
  constructor(mensagem = "Dados incorretos"){
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;