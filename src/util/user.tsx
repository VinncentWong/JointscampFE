import { LoginResponse } from "../components/forms";

const getUser: () => LoginResponse = () => {
    const userString = localStorage.getItem("user");
    const userJson = JSON.parse(userString as string) as LoginResponse;
    return userJson;
};

export default getUser;