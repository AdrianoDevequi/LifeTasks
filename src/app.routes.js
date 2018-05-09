/* global angular */

angular.module('lifeTask').config([
	'$stateProvider', '$urlRouterProvider',
	($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider
			.otherwise(() => '/login');

		$stateProvider
			.state( 'login', {
				url: '/login',
				template: '<lifetask-login></lifetask-login>',
				lazyLoad: $transition$ =>
					$transition$.injector()
						.get('$ocLazyLoad')
						.load('components/lifetask-login/lifetask-login.component.js')
			});
	}
]);