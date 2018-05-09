/* global angular, importStyle */

importStyle('components/lifetask-login/lifetask-login.css', { preload: true });

class LifetaskLogin {
	constructor(){
		this.templateUrl = 'components/lifetask-login/lifetask-login.html';
		this.bindings = {};
		this.controller = LifetaskLoginController;
	}
}

class LifetaskLoginController {
	static get $inject() {
		return ['$element','$ngRedux'];
	}

	constructor($element, $ngRedux) {
		Object.assign(this, { $: $element[0], $ngRedux });

		this.__lifetaskBehavior = $ngRedux.connect(behavior =>
			Object({
				session: behavior.session,
				task: behavior.task,
				reward: behavior.reward
			})
		)(this);
	}


	/* Lifecycle */
	$onInit() { 
		this.$.removeAttribute('unresolved');
	}

	$onDestroy() {
		this.__lifetaskBehavior();
	}
/* */

/* Public */
/* */

/* Private */
/* */

/* Protected */
/* */

/* Observes */
/* */
}
angular.module('lifeTask').component('lifetaskLogin', new LifetaskLogin());

