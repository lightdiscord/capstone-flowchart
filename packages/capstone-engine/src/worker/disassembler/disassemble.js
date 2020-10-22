import { insert } from "../../utils/set";
import * as state from "../session/state";
import * as send from "../../messaging/server/send";

function* iter(instructions) {
    for (let index = 0; index < instructions.count; index += 1) {
        const instruction = instructions.get(index);
        yield instruction;
    }
}

const singles = ["jmp", "call"];
const doubles = ["je", "jne"];
const stops = ["ret"];

const inner = (session) => ({ options, disassembler, offset }) => {
    if (!insert(session.blocs)(offset)) return;

    const bytes = options.bytes.slice(offset - options.offset);
    const instructions = disassembler.disassemble(bytes, offset);
    const iterator = iter(instructions);
    const values = [];

    for (const instruction of iterator) {
        const { address, mnemonic, opString, size } = instruction;

        values.push({ address, mnemonic, opString });
        instruction.delete();
        if (singles.includes(mnemonic)) {
            const destination = parseInt(opString, 16);
            send.bloc({ offset, instructions: values, next: destination })(session.port);
            instructions.delete();
            inner(session)({ options, disassembler, offset: destination });
            return;
        } else if (doubles.includes(mnemonic)) {
            const yes = parseInt(opString, 16);
            const no = address + size;
            instructions.delete();
            send.bloc({ offset, instructions: values, next: [yes, no] })(session.port);
            inner(session)({ options, disassembler, offset: yes });
            inner(session)({ options, disassembler, offset: no });
            return;
        } else if (stops.includes(mnemonic)) {
            break;
        }
    }

    instructions.delete();
    send.bloc({ offset, instructions: values, next: null })(session.port);
}

export const disassemble = (session) => (offset) => {
    state.match(session.state)({
        opened({ options, disassembler }) {
            inner(session)({ options, disassembler, offset });
            send.view(offset)(session.port);
        }
    });
};
