// var DataTypes = require("sequelize");
// var sequelize = require("../config/passport");

module.exports = function(sequelize, DataTypes) {
var Playlist = sequelize.define("playlist", {
  routeName: DataTypes.STRING,
  genre: DataTypes.STRING,
  song: DataTypes.STRING,
  artist: DataTypes.STRING,
  playlist: DataTypes.STRING,
  album: DataTypes.STRING,

  
  
}, {

  freezeTableName: true
});


return Playlist;

}