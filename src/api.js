import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://127.0.0.1:8000";

export const sendMessage = async (data) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/chat`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return res.data;

  } catch (error) {
    console.error("API ERROR:", error?.response?.data || error.message);

    return {
      response: "⚠️ Unable to reach AI server.",
    };
  }
};