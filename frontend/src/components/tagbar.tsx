import { useState } from "react";
import { list } from "./utils/recommendations"
import { useAsyncError } from "react-router-dom";
console.log(list.recommendations);
export const Tagbar = ()=>{
    const [taglist,settaglist] = useState([]);
    const [filteredrecommends, setfilteredrecommends] = useState([]);
    const [searchInput,setSearchinput] = useState("");
    const [dropdownopen,setdropdownopen] = useState(0);


    const onsearch = (e)=>{
        setSearchinput(e.target.value);
        const recommendations = list.recommendations;
        if(searchInput.length>0){
            const filter = recommendations.filter((recommends) =>
                recommends.toLowerCase().includes(searchInput.toLowerCase())
            )
            setfilteredrecommends(filter);
        }
        else{
            setfilteredrecommends([]);
        }
        // setfilteredrecommends([]);
    }
    const recommendationclick = (recommends:string)=>{
        setSearchinput(recommends);
        setfilteredrecommends([]);
    }
    const buttonhandler = ()=>{
        //@ts-ignore
        settaglist([...taglist,searchInput])
        setSearchinput("");
    }
    const toggledropdown = ()=>{
        setdropdownopen(dropdownopen => !dropdownopen);
    }

    return(
        <form className="max-w-md mx-auto">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onChange={onsearch} type="search" id="default-search" value={searchInput} className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-lg " placeholder="Add topics..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={buttonhandler}>
                Add</button>
            </div>
            <div className="">
                
                <button onClick={toggledropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Tags 
                {!dropdownopen?<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex items-center ml-0.5 size-5">
                    <path fill-rule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clip-rule="evenodd" />
                    </svg>}
                
                </button>
                {dropdownopen && taglist.length >0 && (
                    <div id="dropdown" className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700  dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {taglist.map((tag, index) => (
                        <li key={index} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {tag}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                
            </div>
            {filteredrecommends.length > 0 && (
            <div className=" z-10 mt-3 shadow-lg rounded-lg border border-gray-200">
                {filteredrecommends.map((recommends, index) => (
                <div
                    key={index}
                    className="flex cursor-pointer px-4 py-2  rounded-lg items-center hover:bg-gray-100 transition duration-200 ease-in-out"
                    onClick={()=>recommendationclick(recommends)}
                >
                    <div className="text-sm text-gray-700">{recommends}</div>
                </div>
                ))}
            </div>
            )}

            
        </form>
    )
}