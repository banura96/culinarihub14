import { useCallback, useEffect, useState } from "react";


async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();


  function clearData() {
    sendRequest(initialData);
  }


  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config, body: data});
        console.log(resData)
        setData(resData)
        // setIsLoading(false);
      } catch (e) {
        setError(e.message || "SOmething went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if(config && (config.method === 'GET' || !config.method) || !config) {
        sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
