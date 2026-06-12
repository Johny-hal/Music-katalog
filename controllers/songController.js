const Song = require("../models/Song");

exports.getAllSongs = async (req, res) => {
  const songs = await Song.find().sort({ createdAt: -1 });
  res.render("songs/index", { songs });
};

exports.getSongDetail = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.render("songs/show", { song });
};

exports.showCreateForm = (req, res) => {
  res.render("songs/create");
};

exports.createSong = async (req, res) => {
  const { title, artist, genre, description } = req.body;
  let image = "";
  if (req.file) {
    image = req.file.filename;
  }
  await Song.create({ title, artist, genre, description, image });
  res.redirect("/songs");
};

exports.showEditForm = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.render("songs/edit", { song });
};

exports.updateSong = async (req, res) => {
  const { title, artist, genre, description } = req.body;
  const updateData = { title, artist, genre, description };
  if (req.file) {
    updateData.image = req.file.filename;
  }
  await Song.findByIdAndUpdate(req.params.id, updateData);
  res.redirect(`/songs/${req.params.id}`);
};

exports.deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.redirect("/songs");
};
