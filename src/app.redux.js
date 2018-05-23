/* global angular */

angular.module('lifeTask').config([
	'$ngReduxProvider',
	$ngReduxProvider => {
		class SessionReducerState {
			constructor() {
				this.id = '';
				this.name = '';
				this.email = '';
				this.coins = 0;
			}
		}

		function syncWithStorage(state){
			window.localStorage.setItem('sessionState', JSON.stringify(state));
		}
		function getSessionState(){
			const localStorageItem = window.localStorage.getItem('sessionState');
			return localStorageItem  ? JSON.parse(localStorageItem) : new SessionReducerState();
		}
		function sessionReducer(state, action) {
			if (!state)
				return getSessionState();
			let newState = {};
			switch (action.type) {
			case 'LOGIN':
				newState = Object.assign({}, state, {
					id: action.data.id,
					name: action.data.name,
					email: action.data.email
				});
				syncWithStorage(newState);
				return state;
			default:
				return state;
			}
		}
		class TaskReducerState {
			constructor() {
				this.list = [{title: 'titulo', description: 'Descrição'}];
			}
		}
		function taskReducer(state, action) {
			if (!state)

				return new TaskReducerState();
			switch (action.type) {
			default:
				return state;
			}
		}

		class RewardReducerState {
			constructor() {
				this.list = [{title: 'titulo', description: 'Descrição', value: 10}];
			}
		}
		function rewardReducer(state, action) {
			if (!state)
				return new RewardReducerState();
			switch (action.type) {
			default:
				return state;
			}
		}
		$ngReduxProvider.createStoreWith({
			session: sessionReducer,
			task: taskReducer,
			reward: rewardReducer
		});
	}

]);