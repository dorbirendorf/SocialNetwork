import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfileById} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'

const Profile =( 
    {match,
    getProfileById,
     profile:{profile,loading},
     auth
    }) => {
        useEffect(()=>{
            getProfileById(match.params.id)
    },[getProfileById,match.params.id])

    return (
        <Fragment>
           {profile==null || loading ? <Spinner/> : <Fragment>
               <Link to='/profiles' className='btn btn-light'>Back to profiles</Link>
               {auth.isAuthenticated && !auth.loading && auth.user._id===profile.user._id&& 
               <Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>}

           </Fragment> } 
           <div class="profile-grid my-1">
               <ProfileTop profile={profile}/>
           </div>

        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToProps,{getProfileById})(Profile)