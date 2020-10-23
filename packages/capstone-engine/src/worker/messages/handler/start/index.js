import * as state from "../../../session/state";
import * as send from "../../../../messages/server/send";
import * as ERRORS from "../../../errors";
import { capstone } from "../../../wasm";
import { disassemble } from "../../../disassembler/disassemble";

export const start = (session) => (options) => {
    state.match(session.state)({
        opened() {
            send.error(ERRORS.E_ALREADY_INIT)(session.port);
        },
        async closed() {
            const { CSArch, CSMode, Disassembler } = await capstone;
            const arch = CSArch.values[options.arch];
            const mode = CSMode.values[options.mode];
            const disassembler = new Disassembler(arch, mode);

            session.state = state.opened({ options, disassembler });
            send.ready(session.port);
            disassemble(session)(options.offset);
        }
    });
};
