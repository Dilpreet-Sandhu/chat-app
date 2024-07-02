import {connectDb} from './db/connectDb.js';
import { app } from './app.js';

Promise.resolve(connectDb).then(
    app.listen(process.env.PORT,() => {
        console.log('server started')
    })
).catch((err) => {
    console.log(err)
})
 