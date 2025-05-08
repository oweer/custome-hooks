import { use, useEffect, useState } from "react"


export const useFetch = ( url ) => {

    const localCache = { };

    const [state, setstate] = useState({
        data:null,
        isLoading: true,
        hasError: false,
        errorMessage: null,
    });

    useEffect(() => {
        getFetch();
    }, [url]);

    const setLoadingState = () =>{
        setstate({
            data:null,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        });
    }

    const getFetch = async()=>{

        if(localCache[url]){
            console.log('usando cache');
            setstate({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoadingState();

        const resp = await fetch( url );
       
        await new Promise( resolve => setTimeout(resolve,1500));

        if (!resp.ok){
            setstate({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }
        const data = await resp.json();
        setstate({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        });

        localCache[url] = data;

    }



    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,

    }

}
