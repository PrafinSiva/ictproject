angular.module('innings').controller('InningsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Innings',
	function($scope, $stateParams, $location, Authentication, Innings) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var inning = new Innings ({
				name: this.name
			});

			inning.$save(function(response) {
				$location.path('innings/' + response._id);

				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(inning) {
			if ( inning ) {
				inning.$remove();

				for (var i in $scope.innings) {
					if ($scope.innings [i] === inning) {
						$scope.innings.splice(i, 1);
					}
				}
			} else {
				$scope.inning.$remove(function() {
					$location.path('innings');
				});
			}
		};

		$scope.update = function() {
			var inning = $scope.inning;

			inning.$update(function() {
				$location.path('innings/' + inning._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.innings = Innings.query();
		};

		$scope.findOne = function() {
			$scope.inning = Innings.get({
				inningId: $stateParams.inningId
			});
		};
	}
]);
