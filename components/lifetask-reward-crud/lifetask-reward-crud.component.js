/* global angular, firebase, importStyle */

importStyle('components/lifetask-reward-crud/lifetask-reward-crud.css', { preload: true });

class LifetaskRewardCrud {
	constructor() {
		this.templateUrl = 'components/lifetask-reward-crud/lifetask-reward-crud.html';
		this.bindings = {};
		this.controller = LifetaskRewardCrudController;
	}
}

class LifetaskRewardCrudController {
	static get $inject() {
		return ['$element', '$ngRedux', '$state'];
	}

	constructor($element, $ngRedux, $state) {
		Object.assign(this, { $: $element[0], $ngRedux, $state });

		this.__lifetaskBehavior = $ngRedux.connect(behavior =>
			Object({
				userId: behavior.session.id,
				id: behavior.reward.reward.id,
				title:behavior.reward.reward.title,
				description:behavior.reward.reward.description,
				value:behavior.reward.reward.value
			})
		)(this);
	}


	/* Lifecycle */

	$onDestroy() {
		this.__lifetaskBehavior();
	}
	/* */
	/* Public */
	save(){
		if(this.reward.id)
			this.updateReward();
		else
			this.createReward();
	}
	createReward(){
		const db = firebase.firestore();
		db.collection('users')
			.doc(this.userId)
			.collection('rewardList')
			.set({
				title: this.title,
				description: this.description,
				value: this.value
			})
			.then(res => {
				console.log(res);
				db.collection('users')
					.doc(this.userId)
					.get();
			})
			.then(res => {
				this.$ngRedux.dispatch({ type: 'UPDATE_REWARD_LIST',
					data: {
						rewardList: res.data().rewardList
					}
				});
				this.$state.go('rewardList');
			})
			.catch(err => 
				console.error(err)
			);
	}

	updateReward(){
		const db = firebase.firestore();
		db.collection('users')
			.doc(this.userId)
			.collection('rewardList')
			.doc(this.reward.id)
			.update({
				title: this.title,
				description: this.description,
				value: this.value
			})
			.then(() => {
				db.collection('users')
					.doc(this.userId)
					.get();
			})
			.then(res => {
				this.$ngRedux.dispatch({ type: 'UPDATE_REWARD_LIST',
					data: {
						rewardList: res.data().rewardList
					}
				});
				this.$state.go('rewardList');
			})
			.catch(err => 
				console.error(err)
			);
	}
	/* */

	/* Private */
	/* */

	/* Protected */
	/* */

	/* Observes */
	/* */
}
angular.module('lifeTask').component('lifetaskRewardCrud', new LifetaskRewardCrud());

