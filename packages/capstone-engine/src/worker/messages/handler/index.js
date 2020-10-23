import { match } from "../../../messages/client";
import { start } from "./start";
import { disassemble } from "./disassemble";

export const register = (session) => {
    session.port.addEventListener("message", ({ data: message }) => {
        match(message)({
            start: start(session),
            disassemble: disassemble(session)
        });
    });
};
