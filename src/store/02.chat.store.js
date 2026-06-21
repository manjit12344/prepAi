import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const base_url = "http://localhost:3000";


export const userChat = create((set, get) => ({
    preReq: {},
    aiResponse: {},
    loading: false,
    error: null,

    preInt: async ( type, level, company) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${base_url}/api/preInterview/`, {
                type, level, company
            },
                {
                    withCredentials: true
                });
            set({ preReq: response.data,loading: false });
            return response.data
        }
        catch (error) {
            set({ error: error.message, loading: false });
        }

    },


    running: async (id, qId, userResponse) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${base_url}/api/preInterview/conv`, {
                id, qId, userResponse
            }, {
                withCredentials: true
            });
            console.log("RUNNING RESPONSE:", response.data);

            set({ aiResponse: response.data,loading:false });
        }
        catch (error) {
            set({ error: error.message, loading: false });
        }
    }
}))