import { useRouteError } from "react-router-dom";
//useRouteError check if something within the response is ther
//an error or not insted of the local error what we are getting...

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occured";
  let message = " Soomething went wrong ";

  if (error.status === 500) {
    //we are going to parse the error.data so that it can change into an object
    //and we can access it by using .message..
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
