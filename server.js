import { app } from "./src/app.js";
import dns from "node:dns"
import { connect_db } from "./src/config/db.js";

dns.setServers(["8.8.8.8","1.1.1.1"])


connect_db()
.then(()=>{
    const port=process.env.PORT || 8000
    app.listen(port,()=>{
      console.log(`Server is running at address http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log("Connection failed to connect mongodb",err)
})

  