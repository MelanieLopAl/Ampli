export default class Observer {
	constructor() {
		this.subscribers = [];
	}

	Subscribe(observer) {
		this.subscribers.push(observer);
	}

	Unsubscribe(observer) {
		this.subscribers = this.subscribers.filter(o => o != observer);
	}

	Notify(payload) {
		this.subscribers.forEach(o => o(payload));
	}
}
