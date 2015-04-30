'use strict';

/* Declaration de l'application routeApp */

var routeApp = angular.module('routeApp', [
    // Dependances du "module"
    'ngRoute',
    'routeAppControllers'
]);

/* Configuration du module principal : routeApp */

routeApp.config(['$routeProvider',
    function($routeProvider) { 
        // Systeme de routage
        $routeProvider
        .when('/home', {
            templateUrl: '../pages/home.html',
            controller: 'homeCtrl'
        })
        .when('/ranking', {
            templateUrl: '../pages/ranking.html',
            controller: 'rankingCtrl'
        })
		.when('/create', {
            templateUrl: '../pages/create_party.html',
            controller: 'createCtrl'
        })
		.when('/join', {
            templateUrl: '../pages/join_party.html',
            controller: 'joinCtrl'
        })
		.when('/connexion', {
            templateUrl: '../pages/connexion.html',
            controller: 'connectionCtrl'
        })
        .when('/account', {
            templateUrl: '../pages/account.html',
            controller: 'accountCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
]);

/* Definition des controleurs */

var routeAppControllers = angular.module('routeAppControllers', []);

/* Controleur de la page d'accueil */

routeAppControllers.controller('homeCtrl', ['$scope',
    function($scope){
       
    }
]);

/* Controleur de la page de creation d'une partie */

routeAppControllers.controller('createCtrl', ['$scope',
    function($scope){
        $scope.title = "Create a party";
    }
]);

/* Controleur de la page rejoindre une partie */

routeAppControllers.controller('joinCtrl', ['$scope',
    function($scope){
        $scope.title = "Join a party";
    }
]);

/* Controleur de la page connexion */

routeAppControllers.controller('connectionCtrl', ['$scope',
    function($scope){
        $scope.title = "Connect you";
    }
]);


/* Connexion via Google Plus */

routeAppControllers.controller('connectionCtrl', [ '$scope',  'GAuth', 'GApi', '$state',  
        function ( $scope, GAuth, GApi, $state ) {
			$scope.title = "Connection";
			if ( GApi.isLogin() )
				$state.go('home');
			    $scope.connection = function() {
                    GAuth.login().then(function(){
                    	$state.go('home');
                    }, function() {
                        console.log('login fail');
                    });
              };
		}
      ]
);


/* Fonction de vérification de connexion */

routeAppControllers.controller('home-controller',
	['$rootScope', '$scope', 'GAuth','$state',  function ($rootScope, $scope, GAuth,$state ) {
		console.log($rootScope);
		if ( ! GAuth.checkAuth() ) {
			$state.go('login');
		}
		$scope.doLoGout = function(){
				GAuth.logout().then( function(){
						$state.go('login');
				}
				);
		}

	}
         
        ]
);



/* Controleur de la page du compte utilisateur */

routeAppControllers.controller('accountCtrl', ['$scope',
                                            function($scope){
                                                $scope.title = "Your account";
                                            }
                                        ]);


	
	
	/* fonction pour rester connecté via son compte Google plus */
	
	function signinCallback(authResult) {
		  if (authResult['access_token']) {
		    // Autorisation réussie
		    // Masquer le bouton de connexion maintenant que l'utilisateur est autorisé, par exemple :
		    document.getElementById('signinButton').setAttribute('style', 'display: none');
		  } else if (authResult['error']) {
		    // Une erreur s'est produite.
		    // Codes d'erreur possibles :
		    //   "access_denied" - L'utilisateur a refusé l'accès à votre application
		    //   "immediate_failed" - La connexion automatique de l'utilisateur a échoué
		    // console.log('Une erreur s'est produite : ' + authResult['error']);
		  }
		}
