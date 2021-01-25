import {React ,Fragment,useState} from 'react'
import {Link} from 'react-router-dom'

 const Login = () => {

    const [formData,setFormData] = useState({
        email:'',
        password:'',
    })

    const {email,password,}=formData

    const onChange=(event)=>{
        const { name, value } = event.target;
        setFormData({...formData,[name]:value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault()
        console.log('succsusse')
        }
    

    return (
        <Fragment>
                 <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>onChange(e)} />
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            autoComplete='false'
            value={password}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p> 
        </Fragment>
    )
} 
export default Login
