const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.senha, salt);
    this.senha = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Função para comparar a senha digitada com a senha criptografada do usuário
userSchema.methods.comparePassword = async function (senha) {
  try {
    return await bcrypt.compare(senha, this.senha);
  } catch (error) {
    throw new Error(error);
  }
};


const User = mongoose.model("User", userSchema);

module.exports = User;