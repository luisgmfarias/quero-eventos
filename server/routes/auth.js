const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/users");


router.post("/login", async (req, res, next) => {
  try {
    const { user, senha } = req.body;

    const usuario = await User.findOne({ user });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }
    const token = jwt.sign({ user: usuario.user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: usuario._id });
    console.log("login feito");
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao realizar o login." });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const { user, senha } = req.body;
    const novoUsuario = new User({
      user,
      senha,
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
});

module.exports = router;
