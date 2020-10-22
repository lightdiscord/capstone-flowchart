import { capstone } from "./wasm";

import * as send from "../messaging/server/send";

const commitOptions = session => capstone => {
    const format = option => Object.entries(option)
        .map(([key, { value }]) => ([key, value]))
        .filter(([_, value]) => value !== undefined);

    const modes = format(capstone.CSMode);
    const archs = format(capstone.CSArch);

    send.options({ archs, modes })(session.port);
};

import { createSession } from "./session";
import * as state from "./session/state";
import * as ERRORS from "./errors";
import * as handler from "./messages/handler";

self.addEventListener("unhandledrejection", (event) => {
    throw event.reason;
});

self.addEventListener("connect", (event) => {
    const [port] = event.ports;
    const session = createSession(port);

    console.info("Capstone worker received a connection");

    handler.register(session);

    // port.addEventListener("message", (event) => {
    //     const message = event.data;

    //     capstone.then((capstone) => {
    //         matchClient(message)({
    //             start(options) {
    //                 state.match(session.state)({
    //                     opened() {
    //                         send.error(ERRORS.E_ALREADY_INIT)(session.port);
    //                     },
    //                     closed() {
    //                         const arch = capstone.CSArch.values[options.arch];
    //                         const mode = capstone.CSMode.values[options.mode];
    //                         const disassembler = new capstone.Disassembler(arch, mode);

    //                         session.state = state.opened({ options, disassembler });

    //                         port.postMessage({ type: "ready", data: true });
    //                         disassembleAt(session.blocs, disassembler, message.data, message.data.offset, port);
    //                         sendView({ offset: message.data.offset })(port);
    //                     }
    //                 });
    //             },

    //             disassemble({ offset }) {
    //                 state.match(session.state)({
    //                     closed() {
    //                         send.error(ERRORS.E_NON_INIT)(session.port);
    //                     },
    //                     opened({ disassembler, options }) {
    //                         disassembleAt(session.blocs, disassembler, options, message.data.offset, port);
    //                         sendView({ offset: message.data.offset })(port);
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // });

    port.start();

    capstone.then((capstone) => {
        session.state = state.closed();
        commitOptions(session)(capstone);
    });
})
