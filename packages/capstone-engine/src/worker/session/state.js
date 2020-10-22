const STATES = {
    WAITING: Symbol(),
    CLOSED: Symbol(),
    OPENED: Symbol()
};

export const waiting = () => ({
    type: STATES.WAITING
});

export const closed = () => ({
    type: STATES.CLOSED
});

export const opened = ({ disassembler, options }) => ({
    type: STATES.OPENED,
    options,
    disassembler
});

export const match = (state) => (callback) => {
    switch (state.type) {
        case STATES.OPENED:
            return callback.opened?.(state);
        case STATES.CLOSED:
            return callback.closed?.(state);
        case STATES.WAITING:
            return callback.waiting?.(state);
    }
};
