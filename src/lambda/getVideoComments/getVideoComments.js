const handler = async (event) => {
  const { videoId } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;

  const endpoint = `https://www.googleapis.com/youtube/v3/commentThreads`;
  const URLparams = [`part=snippet`, `videoId=${videoId}`, `key=${API_KEY}`, `order=relevance`, `maxResults=100`].join("&");

  const URL = [endpoint, URLparams].join("?");

  const response = await fetch(URL);
  const data = await response.json();

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  }

  try {
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

module.exports = { handler };
