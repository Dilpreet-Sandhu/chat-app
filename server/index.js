import {connectDb} from './src/db/connectDb.js';
import { app } from './src/app.js';


connectDb().then(() => {
    app.listen(process.env.PORT,() => {
        console.log('server started')
    })
}).catch(err => console.log(err))