import server from "./services/express.js";

import webSocket from "./services/websocket.js";
import db from "./database/index.js";

webSocket(server);
db.connectDB();

server.listen(process.env.PORT, () => {console.log(`Listening on ${process.env.PORT}`)})