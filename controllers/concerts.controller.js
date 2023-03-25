const Concert = require("../models/concert.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: "Not found" });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = { performer, genre, price, day, image };
    const con = await Concert.create(newConcert);
    res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = +req.params.id;
    const con = await Concert.findById(id);
    if (!con) res.status(404).json({ message: "Not found" });
    else {
      await concert.remove();
      res.json({ message: "Deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const id = +req.params.id;
    const concert = await Concert.findById(id);
    if (!concert) res.status(404).json({ message: "Not found" });
    else {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};