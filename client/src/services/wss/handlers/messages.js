const message = {
    message: {
        value: undefined,
        createdBy: undefined,
        onDate: undefined,
    },
    sendMessage(message, roomName, userName) {
        const date = new Date();
        const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
            date.getUTCDate(), date.getUTCHours(),
            date.getUTCMinutes(), date.getUTCSeconds());

        const message = {
            ...this.message,
            value: message,
            createdBy: userName,
            onDate: new Date(now_utc),
        }

        return {
            jsonrpc: "2.0",
            method: "ADD_MESSAGE_TO_ROOM",
            params: message,
            id: "",
        }
    }
}