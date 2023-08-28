import { User } from "@firebase/auth-types";
import { action, makeObservable, observable, runInAction } from "mobx";
import { auth } from "../firebase";
import { SignInData } from "../types";
import { toast } from "react-toastify";

class AuthStoreImplementation {
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
      signIn: action,
    });
  }

  setUser(user: User | null) {
    runInAction(() => {
      this.user = user;
    });
  }

  async signIn(values: SignInData) {
    const { email, password } = values;

    const id = toast.loading("Please wait...");

    try {
      const user_credential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      this.setUser(user_credential.user);

      return toast.update(id, {
        render: "Please check your email to verify your account!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: null,
      });
    } catch (error: unknown) {
      toast.update(id, {
        render: error as string,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: null,
      });
    }
  }
}

const authStore = new AuthStoreImplementation();

export default authStore;
