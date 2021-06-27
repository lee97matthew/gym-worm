import axios from "axios";

const API_URL = "https://gym-worm.herokuapp.com/api/auth/" || "http://localhost:5000/api/auth/";

class AuthService {
  async login(email, password) {
    return await axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async updateInfo(firstName, lastName, email, contactNo) {
    return await axios
      .put(API_URL + 'update', {
        firstName,
        lastName,
        email,
        contactNo
      })
      .then(response => {
        return response.data;
      })
  }

  async updateBooking(email, bookingID) {
    return await axios
      .put(API_URL + 'update', {
        email,
        bookingID
      })
      .then(response => {
        return response.data;
      })
  }

  cancelBooking(email, bookingID) {
    return axios
      .put(API_URL + 'cancelBooking', {
        email,
        bookingID
      })
      .then(response => {
        return response.data;
      })
  }

  register(firstName, lastName, email, password, contactNo) {
    return axios
      .post(API_URL + "signup", {
        firstName,
        lastName,
        email,
        password,
        contactNo
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  updateCurrentUser(email, password) {
    return axios
      .post(API_URL + "updateSignin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  async updateEmailNotifications(email, emailNotification) {
    return await axios
      .put(API_URL + 'update', {
        email,
        emailNotification
      })
      .then(response => {
        return response.data;
      })
  }

  async updateSMSNotifications(email, contactNotification) {
    return await axios
      .put(API_URL + 'update', {
        email,
        contactNotification
      })
      .then(response => {
        return response.data;
      })
  }

  async updateTelegramNotifications(email, telegramNotification) {
    return await axios
      .put(API_URL + 'update', {
        email,
        telegramNotification
      })
      .then(response => {
        return response.data;
      })
  }
}

export default new AuthService();