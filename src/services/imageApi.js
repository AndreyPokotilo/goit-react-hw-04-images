import axios from 'axios';

const API_KEY = '34706221-9d2a051ca4e5886c5a95e61e7';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImg(searchQuery, page) {
  const options = {
    mathod: 'GET',
    url: BASE_URL,
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 12,
    },
  };

  const response = await axios(options);

  return response.data;
}
