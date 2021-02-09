
angular.module('deliveries').controller('DeliveriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Deliveries',
	function($scope, $stateParams, $location, Authentication, Deliveries) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var delivery = new Deliveries ({
				name: this.name
			});

			delivery.$save(function(response) {
				$location.path('deliveries/' + response._id);

				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(delivery) {
			if ( delivery ) {
				delivery.$remove();

				for (var i in $scope.deliveries) {
					if ($scope.deliveries [i] === delivery) {
						$scope.deliveries.splice(i, 1);
					}
				}
			} else {
				$scope.delivery.$remove(function() {
					$location.path('deliveries');
				});
			}
		};

		$scope.update = function() {
			var delivery = $scope.delivery;

			delivery.$update(function() {
				$location.path('deliveries/' + delivery._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.deliveries = Deliveries.query();
		};

		$scope.findOne = function() {
			$scope.delivery = Deliveries.get({
				deliveryId: $stateParams.deliveryId
			});
		};
	}
]);
