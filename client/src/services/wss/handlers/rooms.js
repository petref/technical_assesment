
const room = {
    room: {
        roomName: "",
        // avatar: "",
    },
    addNewRoom({ roomName, avatar }) {
        const roomObj = this.room = {
            ...this.room,
            roomName,
            avatar,
        }
        return JSON.stringify({
            jsonrpc: "2.0",
            method: "ADD_NEW_ROOM",
            params: roomObj,
            id: "",
        });
    },
    getRooms() {
        return JSON.stringify({
            jsonrpc: "2.0",
            method: "GET_ALL_ROOMS",
            params: {},
            id: "",
        });
    },
    addUserToRoom(userName, roomName) {
        return JSON.stringify({
            jsonrpc: "2.0",
            method: "ADD_USER_TO_ROOM",
            params: { userName, roomName },
            id: "",
        });
    },
}

export default room;