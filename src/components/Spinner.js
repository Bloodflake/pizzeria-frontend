import React from 'react';
import ReactLoading from 'react-loading';

export default function Spinner(){
    return(
        <div className="py-32">
            <div className='container mx-auto flex justify-center'>
                <ReactLoading className='mx-auto' color="#000000" height={'20%'} width={'20%'}/>
            </div>
        </div>
    )
}