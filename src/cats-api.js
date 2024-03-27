import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_XRPYA4H9rN3qmQ3ltIeqpqR628V4W1E0ak2BmKtY94ypvbSXdrokvZs7qijSg8AM';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchCatsBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data;
  });
}

export function fetchDetailsByCatId(catId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${catId}`).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data;
  });
}

// function fetchCats() {
//   return axios
//     .get(`${BASE_URL}/images/search?breeds&limit=10`)
//     .then(res => {
//       if (res.status !== 200) {
//         throw new Error(res.status);
//       }
//       return res.data;
//     })
//     .then(data => console.log(data))
//     .catch(error => error);
// }

// fetchCats();
