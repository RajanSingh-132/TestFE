import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// console.log("BACKEND:", process.env.REACT_APP_BACKEND_URL);
export const sendMessage = async (data) => {
  try {

    const res = await axios.post(
      `${BASE_URL}/chat`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.data;

  } catch (error) {

    console.error("API ERROR:", error?.response?.data || error.message);

    return {
      response: "⚠️ Unable to reach AI server."
    };

  }
};