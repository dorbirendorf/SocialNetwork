const mongoose=require('mongoose')
const config=require('config')

const dbConnectionString=config.get('mongoUri')

try{
 mongoose.connect(dbConnectionString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false

    },()=>console.log('mongoDB is connected ...'))

}catch(error){
    console.error(error)
    process.exit(1) // exit if falis 
}

