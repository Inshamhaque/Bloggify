import pic from './th.jpeg'
import { useNavigate } from 'react-router-dom';
export const PublishBar = () => {
    const navigate  = useNavigate();
    return (
        <div className="flex justify-between ml-10 mr-10 m-4 items-center">
            <div className="flex flex-row gap-x-2 items-center">
                <div>icon</div>
                <div className='font-medium'>Draft in Kirags</div>
                <div className="text-slate-500">Saved</div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
                <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-xs px-4 py-2 text-center me-2 mb-2 dark:bg-green-600 m-1"
                    onClick={()=>{
                        navigate('/edit');
                    }}
                >
                    Publish
                </button>
                <div className='items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="grey" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="grey" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                </div>
                <div>
                <img className="w-8 h-8 rounded-full" src={pic} alt="Author avatar" />
                </div>
            </div>
        </div>
    );
};
