import  db from "../database/index";

const room = {
    async getRooms(){
        const client = db.getDB();
        const users = await db.collection("users").find().toArray();
        return users;
    },
    async getRoomByID() {},
    async UpdateRoom() {},
    async deleteRoom() {},
};

export default user;