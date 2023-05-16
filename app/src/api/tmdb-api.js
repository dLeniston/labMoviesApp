  export const fetchResource = (args) => {
    const [,urlPart] = args.queryKey;
    const { url } = urlPart;
    return fetch(
      url
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  }

  export const signup = (email, password, firstName, lastName, profileImg) => {
    return fetch(`${import.meta.env.VITE_MOVIES_API}/api/accounts`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, profileImg: profileImg })
    }).then(res => res.json());
};

export const login = (email, password) => {
    return fetch(`${import.meta.env.VITE_MOVIES_API}/api/accounts/security/token`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
    }).then(res => res.json());
};

export const addUserItem = (url, movieId) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'post',
    body: JSON.stringify({ movieId: movieId })
  },
  ).then((res) => res.json());
};

export const getUserItems = (url) => {
  return fetch(url, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  },
  ).then((res) => res.json());
};

export const removeFromUserItems = (url, movieId) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'delete',
    body: JSON.stringify({ movieId: movieId })
  },
  ).then((res) => res.json());
}

export const getUser = (email) => {
  return fetch(`${import.meta.env.VITE_MOVIES_API}/api/accounts/${email}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'get'
  },
  ).then((res) => res.json());
};

 export const getMovieReviews = (id) => {
  return fetch(
    `${import.meta.env.VITE_MOVIES_API}/api/movies/${id}/reviews`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};
  
  