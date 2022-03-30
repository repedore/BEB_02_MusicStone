const fs = require("fs");
const PlaylistService = require("../services/playlist.services");

exports.playlist_get = async (req, res, next) => {
  try {
    const account = req.params.account;
    const playlist = await PlaylistService.getPlaylist(account);
    res.status(200).json({ stoneInfo: playlist, message: "Ok" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.playlist_post = async (req, res, next) => {
  try {
    const account = req.params.account;
    const { userId, stoneId } = req.body;
    const isOk = await PlaylistService.updatePlaylist(userId, stoneId);
    isOk
      ? res.status(201).json({ message: "Ok" })
      : res.status(200).json({ message: "Alreay Exist in your Playlist!!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.playlist_streaming_get = async (req, res, nest) => {
  try {
    const stone_id = req.params.stone_id;
    const path = await PlaylistService.getStonePath(stone_id);
    // streaming
    if (path !== "") {
      const stream = fs.createReadStream(path);
      stream.on("data", function (data) {
        res.write(data);
      });
      stream.on("end", function () {
        res.end();
      });
      stream.on("error", function (err) {
        res.end("500 Internal Server " + err);
      });
    } else {
      res
        .writeHead(404, { "Content-Type": "text/html" })
        .end("404 Page Not Found");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
