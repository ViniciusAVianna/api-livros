import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O campo 'título' é obrigatório"] },
    editora: { type: String },
    preco: { type: Number,
      validate: {
        validator: (preco) => {return preco > 0;},
        message: "Preço deve ser maior que 0"
      }
    },
    versao: {
      type: String,
      required: [true, "O campo 'versão' é obrigatório"],
      enum: {
        values: ["Impresso", "Audiobook", "eBook"],
        message: "'{VALUE}' não é um tipo válido de versão"
      }
    },
    paginas:
    { type: Number,
      min: [10, "O livro deve ter, no mínimo, 10 páginas"],
      max: [5000, "O livro deve ter, no máximo, 5000 páginas"]
    },
    autor: autorSchema
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;