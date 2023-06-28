const express = require("express");
const router = express.Router();

const Event = require("../models/events");
const User = require("../models/users");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/events", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, owner } = req.body;
    const newEvent = new Event({
      title,
      description,
      owner,
      date,
    });

    await newEvent.save();

    res.status(201).json({ message: "Evento criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar evento." });
  }
});
router.get("/events", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar eventos." });
  }
});

router.post("/events/:id/participate", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado." });
    }

    if (event.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Usuário já está participando do evento." });
    }

    event.participants.push(userId);
    await event.save();

    res.status(200).json({ message: "Usuário participando do evento." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao participar do evento." });
  }
});

router.put("/events/:id", authMiddleware, (req, res) => {
  const eventId = req.params.id;
  const updatedEvent = req.body;
  Event.findByIdAndUpdate(eventId, updatedEvent, { new: true })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      res.json(event);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar o evento" });
    });
});

router.delete("/events/:id", authMiddleware, (req, res) => {
  const eventId = req.params.id;

  Event.findOneAndDelete({ _id: eventId })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }
      res.status(200).json({ message: "Evento excluído com sucesso" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao excluir o evento" });
    });
});

router.post("/load", async (req, res) => {
  const { USER_MOCK, EVENT_MOCKS } = require("./mocks");

  try {
    const user = USER_MOCK.user;
    const senha = USER_MOCK.senha;
    const novoUsuario = new User({
      user: user,
      senha: senha,
    });

    await novoUsuario.save();

    const usuario = await User.findOne({ user });

    EVENT_MOCKS.map(async (event) => {
      const newEvent = new Event({
        title: event.title,
        description: event.description,
        owner: usuario._id,
        date: event.date,
      });

      await newEvent.save();
    });

    res.status(201).json({ message: "Mocks adicionados!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar os dados!" });
  }
});

module.exports = router;
