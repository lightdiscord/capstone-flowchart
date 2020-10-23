import * as state from "../../../session/state";
import * as send from "../../../../messages/server/send";


export const disassemble = (session) => ({ offset }) => {
    state.match(session.state)({
        closed() {
            send.error(ERRORS.E_NON_INIT)(session.port);
        },
        opened({ disassembler, options }) {
            disassemble(session)(offset);
        }
    });
};
