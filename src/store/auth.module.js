import firebase from "@/firebaseConfig";
const db = firebase.firestore();

const state = {};

const actions = {
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
            console.log(payload);
            let merged = { ...payload, ...coordinates };
            console.log(merged);
            debugger;
            // save registration data to firebase user collection
            return db
              .collection("users")
              .add(payload)
              .then(() => {
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
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
