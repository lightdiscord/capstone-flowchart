import { create } from "../../utils/enum";

export const { VARIANTS: EVENTS, match } = create([
    ["START_DISASSEMBLER", "start", "start_disassembler"],
    ["DISASSEMBLE_AT", "disassemble", "disassemble_at"]
]);
