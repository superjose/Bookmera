// This is a private key. This is bad practice to leave it out in the wild.
// There are several approaches on how to mitigate this. Since this is a private key
// and no public key was given, it's better to host a back-end server that serves as a proxy
// between the final endpoint and the client.

const apiKey = process.env.REACT_APP_API;

// Object.freeze protects it at the object level from any mutations.
export const api = Object.freeze({
  names: `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`,
  bestSeller: (listNameEncoded: string, offset = 0) =>
    `https://api.nytimes.com/svc/books/v3/lists/current/${listNameEncoded}.json?api-key=${apiKey}&offset=${offset}`,
});

export default api;
