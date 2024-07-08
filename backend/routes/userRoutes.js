import { Router } from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import getUser from "../middlewares/getUser.js";
import { verifyRole, verifyToken } from "../middlewares/verify.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener un usuario por su ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un nuevo usuario
router.post("/", async (req, res) => {
  const {
    name,
    lastname,
    email,
    password,
    country,
    identification,
    age,
    phone,
  } = req.body;

  // Encriptar la contraseña antes de guardar
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    lastname,
    email,
    password: hashedPassword,
    country,
    identification,
    age,
    phone,
    roles: ["user"],
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para actualizar un usuario
router.patch(
  "/:id",
  verifyToken,
  verifyRole(["admin"]),
  getUser,
  async (req, res) => {
    const fieldsToUpdate = [
      "name",
      "lastname",
      "email",
      "country",
      "identification",
      "age",
      "phone",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        res.user[field] = req.body[field];
      }
    });

    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Ruta para eliminar un usuario
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["admin"]),
  getUser,
  async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
