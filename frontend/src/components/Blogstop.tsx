export const Blogtop = ()=>{
    return(
        <div>
            <div className="flex flex-row gap-x-5 text-sm ml-10  mu-10 items-center mt-10 md-5">
                <div className="hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-15 text-slate-500 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </div>
                <div className="hover:cursor-pointer">
                    For you
                </div>
                <div className="text-slate-500 hover:cursor-pointer">
                    Following
                </div>
            </div>
             <div className="ml-8 mr-12" >
                <hr className="h-px my-5 bg-slate-300" />
            </div>
        </div>
        
    )
}