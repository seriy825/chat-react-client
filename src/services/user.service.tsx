import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const UserService = {  
  async update (data:FormData) {   
    return await axios.put(apiUrl +'/users/'+ data.get('_id'),data);
  },
}