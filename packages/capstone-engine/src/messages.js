const MESSAGE_TYPES = {
    READY: 0
};

export function readyMessage() {
    return { type: MESSAGE_TYPES.READY };
}

