(function () {
    'use strict';

    alphaApp.controller('HomeController', ['$scope', HomeController]);

    function HomeController($scope) {
        $scope.navItems = [
            { name: "New Game", href: "#new-game-screen" },
            { name: "Resume Game", href: "#saved-games-screen" }
        ];
        
        $scope.loadScreen = function(item){
            if (item.name === "New Game"){
                $scope.$emit('activateNewGameScreen');
            }
            else if (item.name === "Resume Game"){
                $scope.$emit('activateLoadGameScreen');
            }
            app.application.navigate(item.href);
        };
    }
})();

