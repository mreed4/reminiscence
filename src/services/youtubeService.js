const netlify = "/.netlify/functions";

const fetchWithTimeout = async (url, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export async function fetchVideoTitle(videoId) {
  const response = await fetchWithTimeout(`${netlify}/getVideoTitle?videoId=${videoId}`);
  const data = await response.json();
  return { response, data };
}

export async function fetchVideoComments(videoId) {
  const response = await fetchWithTimeout(`${netlify}/getVideoComments?videoId=${videoId}`);
  const data = await response.json();
  return { response, data };
}
