export default class Observer {
	constructor() {
		this.subscribers = [];
	}

	subscribe(observer) {
		this.subscribers.push(observer);
	}

	unsubscribe(observer) {
		this.subscribers = this.subscribers.filter(o => o != observer);
	}

	notify(payload) {
		this.subscribers.forEach(o => o(payload));
	}
}
