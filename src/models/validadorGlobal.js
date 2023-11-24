import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate",
  {
    validator: (string) => string.trim() !== "",
    message: ({ path }) => `O campo ${path} não pode ficar sem conteúdo`
  });