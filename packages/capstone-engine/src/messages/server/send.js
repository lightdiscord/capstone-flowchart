import { message } from "..";
import { EVENTS } from ".";

export const bloc = message(EVENTS.NEW_BLOC);
export const error = message(EVENTS.ERROR);
export const options = message(EVENTS.OPTIONS);
export const ready = message(EVENTS.READY)();
export const view = message(EVENTS.NEW_VIEW);
