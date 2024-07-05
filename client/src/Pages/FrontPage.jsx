import Button from '@mui/joy/Button';
import {useNavigate} from  'react-router-dom';
import Title from 'react-vanilla-tilt';

const FronPage = () => {
    const navigate = useNavigate();
    const defaultOptions = {
        reverse:        false,  // reverse the tilt direction
        max:            35,     // max tilt rotation (degrees)
        perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:          1.5,    // 2 = 200%, 1.5 = 150%, etc..
        speed:          1000,   // Speed of the enter/exit transition
        transition:     true,   // Set a transition on enter/exit.
        axis:           null,   // What axis should be disabled. Can be X or Y.
        reset:          true,    // If the tilt effect has to be reset on exit.
        easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }
    
    return (
        <>
            <div className=' flex h-screen bg-gradient-to-r from-gray-950 to-gray-700'>
            <section>
                <h1 className="text-center p-40 font-serif text-7xl text-white">Fellow Post</h1>
                <div className="flex items-center justify-center">
                    <Button variant="outlined" style={{padding:"10px 20px" , fontSize:"20px" , margin:"0px 20px"}} onClick={()=>navigate('/login')} >Login</Button>
                    <Button variant="outlined" style={{padding:"10px 20px" , fontSize:"20px"}} onClick={()=>navigate('/signup')} >Signup</Button>
                </div>
            </section>
            <section className='flex items-center justify-center w-1/2'>
                <Title options={{scale:2 , max: 40}} style={{ height: 250, width: 250 }}>
                    <div className='bg-transparent'>
                    <img src='blog.png' className='w-96 p-0'/>
                    </div>
                </Title>
            </section>
            </div>
          
        </>
    )
}
export default FronPage;