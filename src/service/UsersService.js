import axios from "axios";

const PRODUCT_API_URL =
  "https://jsonplaceholder.typicode.com";

class UsersService {

  getAll() {
    return axios.get(`${PRODUCT_API_URL}/users`);
  }

  getByID(userID) {
    return axios.get(`${PRODUCT_API_URL}/users/${userID}/todos`);
  }

  completeTask(taskID) {
    return axios.patch(`${PRODUCT_API_URL}/todos/${taskID}`, { completed: true });
  }
}

export default UsersService;