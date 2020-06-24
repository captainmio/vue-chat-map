import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
  user: {
    loggedIn: false,
    data: null,
  },
};

const actions = {
  fetchUser({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        dispatch("searchAccountByEmail", user.email).then((data) => {
          commit("SET_USER", data[0]);
          resolve(data);
        });
      } else {
        commit("SET_USER", null);
        reject("error");
      }
    });
  },
  login(context, payload) {
    return db
      .auth()
      .signInWithEmailAndPassword(payload.email_address, payload.password)
      .then(() => {
        return "success";
      })
      .catch(() => {
        return "Incorrect login credentials ";
      });
  },
  register(context, payload) {
    return context
      .dispatch("searchAccountByEmail", payload.email_address)
      .then((data) => {
        if (data.length == 0) {
          var coordinates = this.state.map.LatLang;

          if (
            coordinates !== [] &&
            coordinates !== "" &&
            typeof coordinates !== "undefined"
          ) {
            let merged = { ...payload, ...coordinates };
            delete merged["password"];

            // save registration data to firebase user collection
            return db
              .firestore()
              .collection("users")
              .add(merged)
              .then(() => {
                // create user of firebase auth()
                db.auth().createUserWithEmailAndPassword(
                  payload.email_address,
                  payload.password
                );

                return "success";
              })
              .catch((error) => {
                return "Error writing document: " + error;
              });
          } else {
            return "Add your current location to the map";
          }
        } else {
          return "Email address already existed in our database";
        }
      })
      .catch((error) => {
        return "Error writing document: " + error;
      });
  },
  searchAccountByEmail(context, payload) {
    return db
      .firestore()
      .collection("users")
      .where("email_address", "==", payload)
      .get()
      .then(function(querySnapshot) {
        var value_all = [];
        querySnapshot.forEach(function(doc) {
          if (doc.id) {
            value_all.push(doc.data());
          }
        });
        return value_all;
      })
      .catch(() => {
        console.log("Error occured when trying to fetch data by email address");
      });
  },
};

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value;
  },
  SET_USER(state, data) {
    state.user.data = data;
  },
};

const getters = {
  user(state) {
    return state.user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
