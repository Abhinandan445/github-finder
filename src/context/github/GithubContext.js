import githubReducer from "./GithubReducer";
import { createContext, useReducer } from "react";
const GithubConext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubConext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubConext.Provider>
  );
};

export default GithubConext;
