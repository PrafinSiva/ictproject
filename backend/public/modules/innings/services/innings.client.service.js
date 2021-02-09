angular.module('innings').factory('Innings', ['$resource',
	function($resource) {
		return $resource('innings/:inningId', { inningId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
