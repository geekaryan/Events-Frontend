import {
  Outlet,
  //    useNavigation
} from "react-router-dom";

//useNavigation is used to tell us if we are in active transition like moving from one page to another or no active transition is happening...
import MainNavigation from "../components/MainNavigation";

const Root = () => {
  //const navigation = useNavigation();

  //we can use navigation.state to see the current state actually..

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default Root;
