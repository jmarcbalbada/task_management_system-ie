import { isLocal } from "./destinations";

let apiUrl = "http://localhost:3000/";

if (!isLocal) {
  // Assuming your backend is not running on the same machine as your frontend
  // Adjust the IP address accordingly if your backend is running on a different machine
  //   apiUrl = 'http://172.16.103.217:8000/';
  // apiUrl = "http://localhost:3000/";
  apiUrl = "https://task-management-system-ie-back.vercel.app/";
}

const config = {
  API_URL: apiUrl,
};

export default config;
