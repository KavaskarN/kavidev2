(function () {
    'use strict';

    alphaApp.controller('NewGameController', ['$scope', '$rootScope', NewGameController]);

    function NewGameController($scope, $rootScope) {
        $scope.game = { name: "", players: []};
        
        $rootScope.$on('activateNewGameScreen', function(event, data){
            console.log("inside activateNewGameScreen");
            /*$scope.game = {
                name: "Baltimore",
                players: [ { id: 1, name: "dad", currentLetter: "A" }, {id: 2, name: "mom", currentLetter: "A" }, { id: 3, name: "jenna", currentLetter: "A" } ]
            };*/
            // Reset every time screen re-loads
            $scope.game = { name: "", players: []};
        });
        
        $scope.addNew = function(){
            var newId = $scope.game.players.length + 1;
            $scope.game.players.push( { id: newId, name: "", currentLetter: "A" });  
        };
        
        $scope.doneEditing = function(player){
            if (player.name.length === 0){
                $scope.game.players.splice( $scope.game.players.indexOf(player), 1 );
            }
        };
        
        $scope.hidePlay = function(){
            return $scope.game.players.length === 0 || $scope.game.name.length === 0;
        };
        
        $scope.play = function(){
            $scope.$emit("gameSelected", $scope.game);
            app.application.navigate("#game-screen");
        };
    }
})();

