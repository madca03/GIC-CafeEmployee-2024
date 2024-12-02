let instance: EventBus | null = null;

class EventBus {
    // @ts-ignore
    events: Record<any, any>;

    constructor() {
        if (!instance) {
            this.events = {};
            instance = this;
        }

        return instance;
    }

    $emit(event: any, message: any) {
        if (!this.events[event])
            return;

        const callbacks = this.events[event];

        for (let i = 0, l = callbacks.length; i < l; i++) {
            const callback = callbacks[i];
            callback.call(this, message);
        }
    }

    $on(event: any, callback: (options: Record<string, any>) => void) {
        if (!this.events[event])
            this.events[event] = [];

        this.events[event].push(callback);
    }
}


export default new EventBus();