alphaApp.factory("gameMgr", function(){
    var self = this,
        userData = { isLoggedIn: false };
    
    self.el = new Everlive('AqvuOv8S2i4sjoyk');
    self.isLoggedIn = false;
    
    self.saveGame = function(game){
        window.localStorage.setItem("AlphaTrip-" + game.name, JSON.stringify(game));
    };
    
    self.loadAllGames = function(){
        var games = [];
        
        for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            if (key.indexOf("AlphaTrip-") === 0){
                var item = localStorage.getItem(localStorage.key(i));
                games.push(JSON.parse(item));
            }
        }
        
        return games;
    };
    
    self.login = function(username, password, callback){
        return self.el.Users.login(username, password)
            .then(function () {
                self.isLoggedIn = true;
                isLoggedIn = true;
                userData.isLoggedIn = true;
                console.log("self.isLoggedIn", self.isLoggedIn);
                callback();
            },
            function(error) {
                alert(error.message);
            });
    };
    
    self.logout = function(){
        self.el.Users.logout();
        self.isLoggedIn = false;
    };
    
    self.isLoggedIn = function(){
        return userData.isLoggedIn;   
    };
    
    self.publishGame = function(game){
        var data = self.el.data('Games');
        
        var gameToSave = {
            Name: game.name
        };
        
        for (var i = 0; i < game.players.length; i++){
            var player = game.players[i];
            gameToSave["Player" + player.id + "Name"] = player.name;
            gameToSave["Player" + player.id + "Letter"] = player.currentLetter;
        }
        
        data.create(gameToSave,
            function(data){
                alert("SUCCESS: " + JSON.stringify(data));
            },
            function(error){
                alert("ERROR: " + JSON.stringify(error));
            });
    };
    
    
    return {
        saveGame: self.saveGame,
        loadAllGames: self.loadAllGames,
        login: self.login,
        logout: self.logout,
        publishGame: self.publishGame,
        isLoggedIn: self.isLoggedIn
    };
});