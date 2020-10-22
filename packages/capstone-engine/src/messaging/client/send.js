import { message } from ".."
import { EVENTS } from "."

export const start = message(EVENTS.START_DISASSEMBLER);
export const disassemble = message(EVENTS.DISASSEMBLE_AT);
