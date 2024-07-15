import server from "./services/express.js";

import webSocket from "./services/websocket/websocket.js";
import connectDB from "./database/index.js";

webSocket(server);
connectDB.connectDB();

server.listen(process.env.PORT, () => {console.log(`Listening on ${process.env.PORT}`)})