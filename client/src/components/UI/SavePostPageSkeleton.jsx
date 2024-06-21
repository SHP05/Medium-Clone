import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SavePostSkeleton = () => {
    return (
        <>
            <div className='flex max-[1000px]:flex-wrap w-full rounded-2xl bg-[#191c24] mt-5 h'>
                <div className='m-5'>
                    <Skeleton baseColor='#36454F' count={1} className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-600' />
                    <ul className='flex mt-3'>
                        <li>
                            <Skeleton className='mx-1 rounded h-10 w-10' baseColor='#36454F' count={1} circle />
                        </li>
                        <li>
                            <Skeleton className='mx-1 rounded h-10 w-10' baseColor='#36454F' count={1} circle />
                        </li>
                        <li>
                            <Skeleton className='mx-1 rounded h-10 w-10' baseColor='#36454F' count={1} circle />
                        </li>
                    </ul>
                </div>
                <div className='mt-5'>
                    <ul>
                        <li className='flex'>
                            <Skeleton className='mx-1 rounded h-10 w-10' baseColor='#36454F' count={1} circle />
                            <Skeleton className='mx-2 w-52 h-10' baseColor='#36454F' />
                        </li>
                        <li>
                            <Skeleton className='mx-2 w-96 h-20 mt-4' baseColor='#36454F' />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default SavePostSkeleton;