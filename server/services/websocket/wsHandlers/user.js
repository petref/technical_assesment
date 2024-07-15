import dbData from "../../../database/index.js";
export const WS_USER_ACTIONS_TYPES = {
    userObj: {
        userName: undefined,
        email: undefined,
        passsword: undefined,
        isLoggedIn: undefined,
        avatar: undefined,
    },
    jsres: {
        id: undefined,
        result: undefined,
        jsonrpc: "2.0",
        error: undefined,
    },
    async GET_USERS() {
        const db = dbData.getDB("users");
        const res = await db.collection("users").find().toArray();
        return {
            ...this.jsres,
            result: res,
            method:"GET_USERS",
        }
    },
    async UPDATE_USER (username, newData) {
        const db = dbData.getDB("users");
        const res = await db.collection("users").updateOne({userName: username}, {$set: { ...newData}})
    },
    "GET_USER_BY_ID": () => { },
    "DELETE_USER": () => { },
    "UPDATE_USER": () => { }
};