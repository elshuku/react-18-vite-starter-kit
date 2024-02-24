import {useEffect, useState} from "react";
import {LOADING_STATE, mapAsyncResponseToErrorMessage} from "@/util/async.ts";

export const timezonesDataAccessPoint = '/api/timezones';

type UseTimezoneType = [LOADING_STATE, string, string[]];

const useTimezones = (): UseTimezoneType => {
  const [loadingState, setLoadingState] = useState(LOADING_STATE.INITIALISED);
  const [error, setError] = useState('');
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    const getTimezone = async () => {
      try {
        const resp = await fetch(timezonesDataAccessPoint);
        // 200 & 20X response
        if (resp.ok) {
          const timezones = await resp.json()
          setTimezones(timezones as string[]);
          setLoadingState(LOADING_STATE.SUCCESS);
          return [null, timezones];
        }
        // 40X and 50X series responses
        setLoadingState(LOADING_STATE.FAIL);
        setError(mapAsyncResponseToErrorMessage(resp));
        return [error];
      } catch (ex) {
        // Network error, timeout
        setLoadingState(LOADING_STATE.FAIL);
        const errorMessage = ex instanceof Error ? mapAsyncResponseToErrorMessage(ex as Error) : ex as string;
        setError(errorMessage);
      }
    }

     void getTimezone();
  }, []);

  return [loadingState, error, timezones];
}

export default useTimezones;