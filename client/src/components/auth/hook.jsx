import { useState } from "react"
import toast from "react-hot-toast";

const useAsyncMutation = (mutationHook) => {
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState(null);


    const [mutation]  = mutationHook();

    const executeMutation = async (toastMessage,...args) => {
        setLoading(true);
        const toastId = toast(toastMessage);
        try {

        
                const res = await mutation(...args);
                console.log(res);
                if (res.data) {
                  toast.success("request sent sucessfully")
                  setData(res.data.data)
                }
                else {
                  toast.error("couldn't send reqeuset")
                }
              

            
        } catch (error) {
            console.log(error)
            
        }finally {
            setLoading(false)
        }
    }

    return [loading,executeMutation,data]

}

export default  useAsyncMutation