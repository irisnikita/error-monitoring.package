import axios from "axios";

const endpoint = process.env.API_URL + "/suite";

export const createSuite: any = async (projectId: string, suite: any) => {
  try {
    await axios.post(endpoint + `/${projectId}`, {
      type: "create-issue",
      suite,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
