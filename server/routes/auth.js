const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users");

const jwtSecret = "secret";

// Rota de login
router.post("/login", async (req, res, next) => {
  try {
    const { user, senha } = req.body;

    // Verificar se o usuário está cadastrado
    const usuario = await User.findOne({ user });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }

    // Verificar se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }
    const token = jwt.sign({ user: usuario.user }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
    console.log("login feito");
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao realizar o login." });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const { user, senha } = req.body;

    // Aqui você pode adicionar validações dos campos, como verificar se o user já existe, validar a senha, etc.

    // Crie um novo usuário no banco de dados
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