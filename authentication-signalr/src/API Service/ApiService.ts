import axios from "axios";

function ApiService() {
  const handleRequest = (request: Promise<any>) => {
    return request
      .then(response => response.data)
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const RegisterApiService = async (payload: any) => {
    const response = await handleRequest(axios.post("https://localhost:7185/api/User/Register", payload));
    return response;
  };

  const LoginApiService = async (payload: any) => {
    const response = await handleRequest(axios.post("https://localhost:7185/api/User/Login", payload));
    return response;
  };

  const TestApiService = async (token : any) => {
    await fetch('https://localhost:7185/api/SignalR/test', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'accept: */*',
        'Content-Type': 'text'
      }
    }).then(data=>{
      return data;
    }).catch(err=>{
      return err;
    });
  };

  return { RegisterApiService, LoginApiService, TestApiService };
}

export default ApiService;