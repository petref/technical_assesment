import  db from "../database/index";

const user = {
    userObj: {
        userName: "",
        email: "",
        passsword: "",
        avatar: "",
    },
    async getUsers(){
        const client = db.getDB();
        const users = await client.collection("users").find().toArray();
        return users;
    },
    async getUserById() {},
    async UpdateUsers() {},
    async deleteUsers() {},
};

export default user;