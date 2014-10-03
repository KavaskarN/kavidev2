(function () {
    'use strict';

    alphaApp.controller('LoadGameController', ['$scope', '$rootScope', 'gameMgr', LoadGameController]);

    function LoadGameController($scope, $rootScope, gameMgr) {
        
        $rootScope.$on('activateLoadGameScreen', function(event, data){
            $scope.games = gameMgr.loadAllGames();    
            console.log("loadAllGames()", $scope.games);
        });
        
        $scope.resumeGame = function(game){
            $scope.$emit("gameSelected", game);
            app.application.navigate("#game-screen");
        };
    }
})();

