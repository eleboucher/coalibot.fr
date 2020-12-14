import client from "../client/index";

const isAuthenticated = async (to, from, next) => {
  const res = await client.get("/auth/logged");
  if (res.data.logged) {
    return next();
  }
  next("/login");
};

export default isAuthenticated;
