// import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
// import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            {/* <Appbar /> */}
        
            <h1>Loading...</h1>
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}