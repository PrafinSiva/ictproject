angular.module('deliveries').factory('Deliveries', ['$resource',
	function($resource) {
		return $resource('deliveries/:deliveryId', { deliveryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
