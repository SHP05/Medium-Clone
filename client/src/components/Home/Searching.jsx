import { useEffect, useState } from "react";
import axios from "axios";

const Searching = ({searchQuery}) =>{
    const [query,setQuery] = useState('');
    const [SerachResult,SetSearchResult] = useState([]);
    const [debounceQuery,setDebounceQuery] = useState('');

    useEffect(()=>{
        const delaySearch = setTimeout(()=>{
            setDebounceQuery(query);
        },50);
        
        return ()=>{
            clearTimeout(delaySearch);
        }

    },[query]);

    useEffect(()=>{
        const SearchPost = async () =>{
            try{
                const response = await axios.get(`http://localhost:3001/search?search=${query}`);
                SetSearchResult(response.data);
                console.log(SerachResult);
                searchQuery(SerachResult);
            }
            catch(error){
                console.log("error Searching post : ",error);
            }
        }

        if(debounceQuery){
            SearchPost();
        }
        else{
            SetSearchResult([]);
        }
    },[debounceQuery])

    return(
        <>
         <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-500 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" 
                        id="search" 
                        value={query}
                        onChange={(e) => {setQuery(e.target.value) }}  
                        className="block w-full p-3 ps-10 text-lg text-gray-400 border border-gray-500 rounded-lg bg-[#191c24] focus:ring-blue-500 focus:border-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" 
                        required autoComplete="off"/>
                        
                        <button type="submit" className="text-gray-950 absolute end-2.5 bottom-2.5   bg-white hover:bg-gray-500 hover:text-gray-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
        </>
    )
}
export default Searching;