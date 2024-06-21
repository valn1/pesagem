class EventManager {
    private events: Record<string, Function[]> = {};

    public on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    public off(event: string, callback?: Function) {
        if (!this.events[event]) return;
        if (callback) {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        } else {
            delete this.events[event];
        }
    }

    public emit(event: string, ...args: any[]) {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach((cb) => cb(...args));
    }

    public once(event: string, callback: Function) {
        const cb = (...args: any[]) => {
            callback(...args);
            this.off(event, cb);
        };
        this.on(event, cb);
    }

    public await = (event: string) => {
        return new Promise((resolve) => {
            this.once(event, resolve);
        });
    }
}

export const events = new EventManager();