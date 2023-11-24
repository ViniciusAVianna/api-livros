import express from "express";
import connectToDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipularErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";


const conexao = await connectToDB();


conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão estabelecida com sucesso");
});


const app = express();
routes(app);
app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipularErros);


export default app;