'use strict' 

var app = angular.module('login-controller',[]);



app.controller('login-controller',

	[ '$scope',  'GAuth', 'GApi', '$state',  function ( $scope, GAuth, GApi, $state ) {

		if ( GApi.isLogin() )
				$state.go('home');
			
			
		
            $scope.doSingup = function() {

                    GAuth.login().then(function(){
                    $state.go('home');

                    }, function() {
                        console.log('login fail');
                    //    $state.go('login');
                    });
              };
            }
        ]
);