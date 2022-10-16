import role from "@/config/role";
import auth from "@/store/auth";

const roleAccount = (to) => {
  console.log(to.name);
  const { userScreens, adminScreens } = role;

  console.log(auth.state.user);

  if (auth.state.user && auth.state.user.typeAccount == "super_admin")
    return true;
  else if (
    auth.state.user &&
    auth.state.user.typeAccount == "admin" &&
    adminScreens.includes(to.name)
  )
    return true;
  else if (
    auth.state.user &&
    auth.state.user.typeAccount == "user" &&
    userScreens.includes(to.name)
  )
    return true;
  else return false;
};
export default roleAccount;
