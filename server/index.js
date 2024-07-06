import server from "./api/express.js";


server.listen(process.env.PORT, () => {console.log(`Listening on ${process.env.PORT}`)})