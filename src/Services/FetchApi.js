const fetchApi = async (url) => {
  const endpoint = url;
  const response = await fetch(endpoint);
  const data = await response.json();

  console.log(data);
  return data;
};

export default fetchApi;
