import { Router } from "express";
import Guide from "../models/Guides.js";
import getGuide from "../middlewares/getGuide.js";
import { check, validationResult } from "express-validator";

const router = Router();

// Obtener todos los guías o por provincia
router.get("/", async (req, res) => {
  try {
    const { province } = req.query;
    let guides;
    if (province) {
      guides = await Guide.find({ province });
    } else {
      guides = await Guide.find();
    }
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un guía por ID
router.get("/:id", getGuide, (req, res) => {
  res.json(res.guide);
});

// Crear un nuevo guía
router.post(
  "/",
  [
    check("id").isNumeric().withMessage("El ID debe ser un número"),
    check("firstName").notEmpty().withMessage("El nombre es obligatorio"),
    check("lastName").notEmpty().withMessage("El apellido es obligatorio"),
    check("age").isNumeric().withMessage("La edad debe ser un número"),
    check("phone").notEmpty().withMessage("El teléfono es obligatorio"),
    check("province").notEmpty().withMessage("La provincia es obligatoria"),
    check("image").notEmpty().withMessage("La imagen es obligatoria"),
    check("description")
      .notEmpty()
      .withMessage("La descripción es obligatoria"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const guide = new Guide({
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      phone: req.body.phone,
      province: req.body.province,
      image: req.body.image,
      description: req.body.description,
    });

    try {
      const newGuide = await guide.save();
      res.status(201).json(newGuide);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Actualizar un guía por ID
router.patch("/:id", getGuide, async (req, res) => {
  const updates = [
    "firstName",
    "lastName",
    "age",
    "phone",
    "province",
    "image",
    "description",
  ];

  updates.forEach((field) => {
    if (req.body[field] != null) {
      res.guide[field] = req.body[field];
    }
  });

  try {
    const updatedGuide = await res.guide.save();
    res.json(updatedGuide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un guía por ID
router.delete("/:id", getGuide, async (req, res) => {
  try {
    await res.guide.remove();
    res.json({ message: "Guía eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
