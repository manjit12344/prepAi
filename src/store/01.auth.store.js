import { create } from "zustand";
import axios from "axios";

const base_url = "https://prep-ai-backend-nine.vercel.app"

// user Authentication handling

export const userAuth = create((set, get) => ({
    user: {},
    know:{},
    logger:{},
    loading: false,
    error: null,
    knowMe: async () => {
        set({ loading: true });
        try{
         const response = await axios.get(`${base_url}/knowMe`,{
            withCredentials:true
         })
         set({know:response.data,error:null,loading:false});

        }catch(error){
            set({ error: error.message, loading: false });
        }
    },
    logOut: async()=>{
        set({ loading: true });
        try{
            const response = await axios.get(`${base_url}/logOut`,{
                withCredentials:true
            })
            set({logger:response.data,know:{},error:null,loading:false});

        }
        catch(error){
            set({ error: error.message, loading: false });
        }
    }

}))