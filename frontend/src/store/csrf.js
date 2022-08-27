// frontend/src/store/csrf.js

// TODO: Wrapping fetch requests with CSRF

//? Import Cookies from js-cookie
import Cookies from 'js-cookie';

//? csrfFetch function
export const csrfFetch = async (url, options = {}) => {
  // if method is not set, set it to GET
  options.method = options.method || 'GET';
  
  // if headers is not set, default to empty object
  options.headers = options.headers || {};

  // if method is other than GET, set XSRF-TOKEN to extracted XSRF-TOKEN cookie value
  if (options.method.toUpperCase() !== "GET") {
    if (options.headers["Content-Type"] === "multipart/form-data") {
      delete options.headers["Content-Type"];
    } else {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }

  // call window.fetch w/ url and options object
  const res = await window.fetch(url, options);

  // if res status is 400 or above, throw error
  if (res.status >= 400) throw res;

  // otherwise if everything else successful, return response
  return res;
}

//? restoreCSRF function
// function that can call GET /api/csrf/restore when application is loaded
export const restoreCSRF = () => csrfFetch('/api/csrf/restore');
