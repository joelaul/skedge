// wrapper that runs outside the default function
export const fetchWrapper = (url, opts) => {
  fetch(url, updateOpts(opts));
}

export const updateOpts = (opts) => {
  const update = { ...opts }
  if (localStorage.jwt) {
    update.headers = {
      ...update.headers,
      "Authorization": `Bearer ${localStorage.jwt}`
    };
  }
  return update;
}