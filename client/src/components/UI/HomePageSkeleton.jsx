import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomePageSkeleton = () =>{
    return(
        <>
                <div className='h-52 rounded-lg bg-slate-900 flex'>
                    <Skeleton count={1} className='h-40 h- w-40 mx-3 mt-2' baseColor='#36454F'/>
                    <div className='ml-10 mt-2'>
                    <Skeleton circle className='round h-10 w-10' baseColor='#36454F'/>
                    <Skeleton className='w-40 h-6 rounded-2 my-3' baseColor='#36454F'/>
                    <Skeleton className=' w-80 h-24' baseColor='#36454F'/>
                    </div>
                </div>
                <div className='h-52 rounded-lg bg-slate-900 flex'>
                    <Skeleton count={1} className='h-40 h- w-40 mx-3 mt-2' baseColor='#36454F'/>
                    <div className='ml-10 mt-2'>
                    <Skeleton circle className='round h-10 w-10' baseColor='#36454F'/>
                    <Skeleton className='w-40 h-6 rounded-2 my-3' baseColor='#36454F'/>
                    <Skeleton className=' w-80 h-24' baseColor='#36454F'/>
                    </div>
                </div>
                <div className='h-52 rounded-lg bg-slate-900 flex'>
                    <Skeleton count={1} className='h-40 h- w-40 mx-3 mt-2' baseColor='#36454F'/>
                    <div className='ml-10 mt-2'>
                    <Skeleton circle className='round h-10 w-10' baseColor='#36454F'/>
                    <Skeleton className='w-40 h-6 rounded-2 my-3' baseColor='#36454F'/>
                    <Skeleton className=' w-80 h-24' baseColor='#36454F'/>
                    </div>
                </div>
        </>
    )
}

export default HomePageSkeleton;