class lifetaskApp {
	constructor(){
		this.templateUrl = 'components/lifetask-app/lisfetask-app.html';
		this.bindings = {};
		this.controller = lifetaskAppController;
	}
}

class lifetaskAppController {
	static get $inject() {
		return ['$element','$ngRedux'];
	}

	constructor($element, $ngRedux) {
		Object.assign(this, { $: $element[0], $ngRedux });
	}


	/* Lifecycle */
	$onInit() { }

	$onDestroy() { }
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
angular.module('lifeTask').component('lifetaskApp', new lifetaskApp());

