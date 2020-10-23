import { capstone } from "./wasm";
import { create } from "./session";
import * as state from "./session/state";
import * as ERRORS from "./errors";
import * as handler from "./messages/handler";
import * as send from "../messages/server/send";

const formatCEnum = (object) => Object.entries(object)
    .map(([key, { value }]) => ([key, value]))
    .filter(([_, value]) => value !== undefined);

const sendOptions = session => ({ archs, modes }) => {
    send.options({ archs, modes })(session.port);
};

self.addEventListener("unhandledrejection", (event) => {
    throw event.reason;
});

self.addEventListener("connect", async ({ ports }) => {
    const [port] = ports;
    const session = create(port);

    handler.register(session);
    port.start();

    const { CSArch, CSMode } = await capstone;

    session.state = state.closed();
    sendOptions(session)({
        archs: formatCEnum(CSArch),
        modes: formatCEnum(CSMode)
    });
})
