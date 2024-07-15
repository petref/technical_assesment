import { WS_ROOM_ACTIONS_TYPES } from "./rooms.js";
import { WS_USER_ACTIONS_TYPES } from "./user.js";

export const ACTION_TYPES = {
    ...WS_ROOM_ACTIONS_TYPES,
    ...WS_USER_ACTIONS_TYPES,
}