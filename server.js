import { app } from "./src/app.js";
import dns from "node:dns"
import { connect_db } from "./src/config/db.js";

dns.setServers(["8.8.8.8","1.1.1.1"])


connect_db()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
      console.log(`Server is running at address  http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Connection failed to connect mongodb",err)
})

  