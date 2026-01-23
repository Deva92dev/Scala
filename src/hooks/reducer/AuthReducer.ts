type AuthState = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

type AuthAction =
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

export const initialState: AuthState = {
  status: "idle",
  error: null,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "SUBMIT":
      return { status: "loading", error: null };
    case "SUCCESS":
      return { status: "success", error: null };
    case "ERROR":
      return { status: "error", error: action.payload };
    case "RESET":
      return { status: "idle", error: null };
    default:
      return state;
  }
};
