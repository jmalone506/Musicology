// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const user = require("../models/user");
// const CodyMusic = require("cody-music");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
app.post("/api/add_playlist", (req, res)=> {
  console.log(req.body);
  db.playlist
  .create({
    playlistId: req.body.playlistId,
    playlistName: req.body.playlistName,
    genre: req.body.genre,
    song: req.body.song,
    artist: req.body.artist,
    album: req.body.album,
    search: req.body.search,
  })
  .then(() =>{
    res.send(200);
  })
  .catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
});
app.delete("/api/delete_playlist", (req, res)=>{
  console.log(req.body);
  db.playlist
  .destroy({
    where: {playlistId: req.body.playlistId},
  })
  .then(() =>{
    res.send(200);
  })
  .catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
//   await CodyMusic.getRunningTrack().then
//   ((track) => {
//     // returns the Track data
// });

// // play a specific spotify track
// await CodyMusic.playTrack(
//     "spotify",
//     "spotify:track:2YarjDYjBJuH63dUIh9OWv"
// ).then((result) => {
//     // track is playing
// });

// // play an iTunes track number
// await CodyMusic.playTrack("itunes", 1).then((result) => {
//     // track is playing
// });

// // handling errors
// await CodyMusic.playTrack("spotify", 1000000000).then((result) => {
//     // result will contain the "error" attribute with the error message
//     if (result.error) {
//         console.log(`Unable to play track, error: ${result.error}`);
//     }
// });
// await CodyMusic.getRunningTrack().then((result) => {
//     // result will be the best effort track that is playing.
//     // i.e. if you have your itunes app running, it would show you that track
// });
});


// $("#addPlaylist").on('click', function(){
//   let playlist;
//   playlist = {
//     playlistname: $("inputPlaylist").val().trim(),
//     // routeName: Sequelize.STRING,
//     genre: true,
//     song: true,
//     artist: true,
//     playlist: true,
//     album: true,
//     search: true,
//   };
//   if(!playlist){
//     return;
//   }
//   $.post("/api/add_playlist", playlist).then(() =>{
//     console.log(playlist)
//     $.get("/api/user").then(data =>{
//       user = data.id;
//     })
//   })
// })