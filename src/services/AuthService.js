import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";

export class AuthService {
  constructor(firebaseApp) {
    this.db = getDatabase(firebaseApp);
    this.auth = getAuth(firebaseApp);
    this.userData = {
      name: "",
    };

    signInAnonymously(this.auth).catch((err) => {
      console.error(err);
    });
  }

  watchAuthState(callback) {
    return onAuthStateChanged(this.auth, (user) => {
      callback(user);
    });
  }

  watchUserData(callback) {
    return onValue(
      ref(this.db, `users/${this.uid}`),
      (snapshot) => {
        callback(snapshot.val() || {});
      },
      (err) => {
        console.log(err);
      }
    );
  }

  watchAuthStateAndUserData(callback) {
    let unsubscribeUserData;
    let unsubscribeAuthState = this.watchAuthState((user) => {
      if (user) {
        unsubscribeUserData && unsubscribeUserData();
        unsubscribeUserData = this.watchUserData((data) => {
          data.uid = user.uid;
          callback(data);
        });
      } else {
        callback(null);
      }
    });

    return () => {
      unsubscribeAuthState();
      unsubscribeUserData && unsubscribeUserData();
    };
  }

  updateUserData({ name }) {
    Object.assign(this.userData, {
      name,
    });
    set(ref(this.db, `users/${this.uid}`), this.userData);
  }

  get uid() {
    return this.auth.currentUser?.uid;
  }
}
