// wrapper that runs inside the default function
export const setHeaders = (headers) => {
    if(localStorage.jwt) {
        return {
            ...headers,
            "Authorization": `Bearer ${localStorage.jwt}`
        }
    } else {
        return headers;
    }
  }