(function () {
    'use strict';

    alphaApp.controller('GameController', ['$scope', '$rootScope', 'gameMgr', GameController]);
    alphaApp.controller('PlayerController', ['$scope', PlayerController]);

    function GameController($scope, $rootScope, gameMgr) {
    
        $rootScope.$on("gameSelected", function (event, data){
            $scope.game = data;
            $scope.isLoggedIn = gameMgr.isLoggedIn();
        });
        
        $scope.saveGame = function(){
            gameMgr.saveGame($scope.game);
            navigator.notification.alert("Game is saved.");
        };
        
        $scope.publishGame = function(){
            if ($scope.isLoggedIn){
                gameMgr.publishGame($scope.game);
            }
            else{
                alert("You must first login to publish a game.");
            }
        };
    }
    
    function PlayerController($scope){
        $scope.$watch("player.currentLetter", function(currentLetter){
            $scope.nextLetter = nextLetter(currentLetter);
            $scope.previousLetter = previousLetter(currentLetter);
            $scope.showPrevious = (currentLetter !== "A");
            $scope.showNext = (currentLetter !== "Z");
        });
        
        $scope.moveToNextLetter = function(item){
            item.currentLetter = nextLetter(item.currentLetter);
            if (item.currentLetter === "Z") {
                navigator.notification.alert(item.name + " WINS!!");
            }
        };
        
        $scope.moveToPrevousLetter = function(item){
            item.currentLetter = previousLetter(item.currentLetter);
        };
        
        var previousLetter = function(letter){
            return String.fromCharCode(letter.charCodeAt(0) - 1);
        }
        
        var nextLetter = function(letter){
            return (letter === "" ? "A" : String.fromCharCode(letter.charCodeAt(0) + 1));
        }
    }
})();

