
var Sequelize = require("sequelize");
var sequelize = require("../config/passport");

var Playlist = sequelize.define("playlist", {
  routeName: Sequelize.STRING,
  genre: Sequelize.STRING,
  song: Sequelize.STRING,
  artist: Sequelize.STRING,
  playlist: Sequelize.STRING,
  album: Sequelize.STRING,
  search: Sequelize.ARRAY
  
  
}, {

  freezeTableName: true
});


Playlist.sync();

module.exports = Playlist