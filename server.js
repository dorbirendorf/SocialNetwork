const express=require('express')
require('./config/db')   //runs DB
const app=express()
const path=require('path') 

//routers
const usersRouter=require('./routes/users')
const postsRouter=require('./routes/posts')
const profileRouter=require('./routes/profile')
const authRouter=require('./routes/auth')
const { appendFile } = require('fs')

//use middelware
app.use(express.json())




app.use('/users',usersRouter)
app.use('/posts',postsRouter)
app.use('/auth',authRouter)
app.use('/profile',profileRouter)

//serve static assest  in production

if (process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
    }

    const PORT=process.env.PORT ||5000


app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))



