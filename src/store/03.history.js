import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const base_url = "http://localhost:3000"
export const useHistory = create((set, get) => ({
    chat: [],
    interview: [],
    loading: false,
    error: null,

    myChatHistory: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${base_url}/hist/chat/${id}`)

            set({ chat: response.data.response, loading: false, error: null })
        }
        catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    myInterviews:async(token)=>{
         set({ loading: true, error: null });
         try{
            const response = await axios.get(`${base_url}/hist/allInterview`, )
            set({interview:response.data.response,loading:false,error:null})
            
         }catch(error){
            set({ error: error.message, loading: false })
         }
      
    }
    

}))