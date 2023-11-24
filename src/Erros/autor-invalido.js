import ErroBase from "./erro-base.js";

class AutorInvalido extends ErroBase{
  constructor(){
    super("Autor inexistente ou não informado", 400);
  }
}

export default AutorInvalido;