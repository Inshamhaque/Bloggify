import React, { useEffect, useState } from "react";

export const Content = () => {
    const [preview, setPreview] = useState("");
    const [length, setLength] = useState(0);

    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (value.length <= 140) {
            setPreview(value);
            setLength(value.length);
        } else {
            setPreview(value.slice(0, 140));
            setLength(140);
        }
    };

    return (
        <div className="mt-5">
            <form>
                <div className="w-full mb-2">
                    <div className="py-2 bg-white border-b border-gray-200 font-normal rounded-t-lg">
                        <label htmlFor="comment" className="sr-only">Write preview content...</label>
                        <textarea
                            onChange={onChangeHandler}
                            id="comment"
                            rows="4"
                            className="outline-none w-full px-0 text-sm"
                            placeholder="Write preview content..."
                            value={preview}
                            required
                        />
                        <div className="text-xs text-slate-600">{length}/140</div>
                    </div>
                </div>
            </form>
        </div>
    );
};
