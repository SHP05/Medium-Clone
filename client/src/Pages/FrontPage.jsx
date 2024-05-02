import Button from '@mui/joy/Button';
import {useNavigate} from  'react-router-dom'

const FronPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>
                <h1 className="text-center p-40 font-serif text-7xl">Fellow Post</h1>
                <div className="flex items-center justify-center">
                    <Button variant="outlined" style={{padding:"10px 20px" , fontSize:"20px" , margin:"0px 20px"}} onClick={()=>navigate('/login')} >Login</Button>
                    <Button variant="outlined" style={{padding:"10px 20px" , fontSize:"20px"}} onClick={()=>navigate('/signup')} >Signup</Button>
                </div>
            </div>
        </>
    )
}
export default FronPage;