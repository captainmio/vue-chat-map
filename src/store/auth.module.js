import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
  user: {
    loggedIn: false,
    data: null,
  },
};

const actions = {
  getUserByID(context, payload) {
      return db
      .firestore()
      .collection("users")
      .doc(payload)
      .get()
      .then(function(querySnapshot) {
        // var value_all = [];

        return querySnapshot.data();

        
      })
      .catch(err => {
        console.log(err);
      });
  

  },
  Logout(context) {
    return new Promise((resolve, reject) => {
      return db
      .auth()
      .signOut()
      .then(data => {
        // purge user object value
        context.commit("SET_USER", null);
        context.commit("SET_LOGGED_IN", null);

        resolve(data);
      })
      .catch(() => {
        reject("Error on logout");
      });
      
    });
  },
  fetchUser({ commit, dispatch }, user) {
    // fetch current user logged-in
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
    // authenticate user login credentials
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


                // add the user to the list of user
                // var doc_id = doc.id;
                // let userListObject = { [doc_id]: false };
                // db
                // .firestore()
                // .collection("user_lists")
                // .add(userListObject)

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
            const data = doc.data();
            data.id = doc.id;
            value_all.push(data);
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
