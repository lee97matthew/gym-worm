import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  login(email, password) {
    return axios
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

  updateInfo(firstName, lastName, email, contactNo) {
    return axios
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

  updateBooking(email, bookingID) {
    return axios
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

  updateEmailNotifications(email, emailNotification) {
    return axios
      .put(API_URL + 'update', {
        email,
        emailNotification
      })
      .then(response => {
        return response.data;
      })
  }

  updateSMSNotifications(email, contactNotification) {
    return axios
      .put(API_URL + 'update', {
        email,
        contactNotification
      })
      .then(response => {
        return response.data;
      })
  }

  updateTelegramNotifications(email, telegramNotification) {
    return axios
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