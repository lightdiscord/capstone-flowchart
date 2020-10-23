import { create } from "../../utils/enum";

export const { VARIANTS: EVENTS, match } = create([
    ["ERROR", "error", "error"],
    ["NEW_BLOC", "bloc", "new_section"],
    ["NEW_VIEW", "view", "finished_for"],
    ["OPTIONS", "options", "options"],
    ["READY", "ready", "ready"],
]);
