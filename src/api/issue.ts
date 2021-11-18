import axios from "axios";

const endpoint = process.env.API_URL + "/issue";

export const createIssue: any = async (projectId: string, issue: any) => {
  try {
    await axios.post(endpoint + `/${projectId}`, {
      type: "create-issue",
      issue,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
