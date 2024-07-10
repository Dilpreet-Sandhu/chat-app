import {connectDb} from './src/db/connectDb.js';
import { server } from './src/app.js';


connectDb().then(() => {
    server.listen(process.env.PORT,() => {
        console.log('server started')
    })
}).catch(err => console.log(err))