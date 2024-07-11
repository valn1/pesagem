class EventManager {
    private events: Record<string, Function[]> = {};

    /**
     * inicia um eventListener
     * @param event evento a ser registrado
     * @param callback callback que será chamado quando o evento for emitido
     */
    public on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    /**
     * remove um eventListener
     * @param event evento a ser removido
     * @param callback callback do evento(deve ser o mesmo que foi passado no on)
     */
    public off(event: string, callback?: Function) {
        if (!this.events[event]) return;
        if (callback) {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        } else {
            delete this.events[event];
        }
    }

    /**
     * emite um evento, disparando todos os callbacks registrados para ele
     * @param event evento a ser emitido
     * @param args argumentos que serão passados para os callbacks
     */
    public emit(event: string, ...args: any[]) {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach((cb) => cb(...args));
    }

    /**
     * registra um eventListener que será chamado apenas uma vez e depois removido
     * @param event evento a ser registrado
     * @param callback callback que será chamado quando o evento for emitido
     */
    public once(event: string, callback: Function) {
        const cb = (...args: any[]) => {
            callback(...args);
            this.off(event, cb);
        };
        this.on(event, cb);
    }

    /**
     * registra um eventListener que será chamado apenas uma vez e depois removido, funciona de forma assíncrona
     * @param event evento a ser registrado
     * @returns uma Promise que será resolvida quando o evento for emitido
     */
    public await = (event: string) => {
        return new Promise((resolve) => {
            this.once(event, resolve);
        });
    }
}

export const events = new EventManager();