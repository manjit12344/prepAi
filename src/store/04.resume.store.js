import { create } from "zustand";
import axios from "axios";

const useResumeStore = create((set) => ({
    resumeUrl: "",
    review: "",

    uploadResume: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "resume_uploads");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dwjsj9imy/auto/upload",
            formData,
            {
                withCredentials: false,
            }
        );

        set({
            resumeUrl: response.data.secure_url,
        });

        return response.data.secure_url;
    },

    clearResume: () => set({ resumeUrl: "" }),

    toServer: async (url) => {

        const response = await axios.post("http://localhost:3000/resume", {
            url: url
        })
        set({ review: response.data });
        return review;
    }




}));

export default useResumeStore;