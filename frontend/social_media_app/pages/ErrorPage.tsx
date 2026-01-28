import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
  // The type of 'error' is unknown
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type 'ErrorResponse' (for status codes like 404, 401, etc.)
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    // error is a standard JavaScript Error object (for unexpected code errors)
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // error is a string
    errorMessage = error;
  } else {
    // Fallback for any other type of thrown value
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
