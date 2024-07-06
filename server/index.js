import server from "./services/express.js";

import webSocket from "./services/websocket.js";


webSocket(server);

server.listen(process.env.PORT, () => {console.log(`Listening on ${process.env.PORT}`)})