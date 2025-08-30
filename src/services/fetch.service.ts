export const fetchService = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data with url: ${url}`);
  }

  const data = await response.json();

  return data;
};
