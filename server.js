const express=require('express')
require('./config/db')   //runs DB
const app=express()

//routers
const usersRouter=require('./routes/users')
const postsRouter=require('./routes/posts')
const profileRouter=require('./routes/profile')
const authRouter=require('./routes/auth')

//use middelware
app.use(express.json())


const PORT=process.env.PORT ||5000


app.get("/", (req,res)=>res.send('Its alive!'))
app.use('/users',usersRouter)
app.use('/posts',postsRouter)
app.use('/auth',authRouter)
app.use('/profile',profileRouter)










app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))



