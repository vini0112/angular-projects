
import app from './app.js'
import connection from './app/database/connection.js';

const port = process.env.PORT || 3000;

// doing connection to mysql

connection.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log('Success Connection!')
        app.listen(port, () => console.log(`Running in port ${port}`))

    }
})



