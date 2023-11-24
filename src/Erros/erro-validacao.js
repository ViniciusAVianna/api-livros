import RequisicaoIncorreta from "./requisicao-incorreta.js";

class ErroValidacao extends RequisicaoIncorreta{
  constructor(erro){
    console.log(Object.values(erro.errors)[0].message);

    const mensagemDeErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
      
    super(`Erro na validação dos dados: ${mensagemDeErro}`);
  }
}

export default ErroValidacao;