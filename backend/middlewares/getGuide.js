import Guide from "../models/Guides.js";

const getGuide = async (req, res, next) => {
  let guide;
  try {
    guide = await Guide.findOne({ id: req.params.id });
    if (guide == null) {
      return res.status(404).json({ message: "No se pudo encontrar el guía" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.guide = guide;
  next();
};

export default getGuide;
