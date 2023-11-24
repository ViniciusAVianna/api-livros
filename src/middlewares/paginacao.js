import RequisicaoIncorreta from "../Erros/requisicao-incorreta.js";


async function paginar(req, res, next){
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    if (ordem != -1){
      ordem = 1;
    }

    if (limite <= 0 || pagina <= 0){
      next(new RequisicaoIncorreta());
    } else {
      const resultadoPaginado = await req.resultado.find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1)*limite)
        .limit(limite);

      res.status(200).json(resultadoPaginado);

    }
  } catch(erro){
    next(erro);
  }
}

export default paginar;
