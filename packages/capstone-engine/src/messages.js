export const REQUESTS = {
    ASK_CONFIG: 0
};

export const RESPONSES = {
    READY: 0,
    REPLY_CONFIG: 1
};

export function createMessage(type, data = {} ) {
    return { type, data };
};

export function askConfigMessage() {
    return createMessage(REQUESTS.ASK_CONFIG);
}

export function replyConfigMessage(config) {
    return createMessage(RESPONSES.REPLY_CONFIG, config);
}

export function readyMessage() {
    return createMessage(RESPONSES.READY);
}
