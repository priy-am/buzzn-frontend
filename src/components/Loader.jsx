import React from 'react'

const Loader = () => {
    return (

        <>
            <div className=" absolute  flex justify-center items-center left-[40%] top-[40%]">
                <div className="loader border-x-2 border-solid border-white  rounded-full h-16 w-16 animate-spin"></div>
            </div>
        </>
    )
}

export default Loader
