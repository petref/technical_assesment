import dbData from "../../../database/index.js";

export const WS_ROOM_ACTIONS_TYPES = {
    roomObj: {
        userName: undefined,
        status: undefined,
        avatar: undefined,
    },
    jsres: {
        id:undefined,
        result: undefined,
        jsonrpc: "2.0",
        error: undefined,
    },
    async ADD_NEW_ROOM({ roomName, avatar}) {
       const db = dbData.getDB("users");
       const res = await db.collection("rooms").insertOne({
        roomName, 
        avatar
       })
    },
    async GET_ROOMS() {
        const dbs = dbData.getDB("users");
        const result = await dbs.collection("rooms").find().toArray()

        return {
            ...this.jsres,
            id: "",
            result,
            method: "GET_ROOMS"
        };
    },
    "GET_ROOM_BY_ID": () => {},
    "DELETE_ROOM": () => {},
    "UPDATE_ROOM": () => {}
};