// import { useEffect, useState } from "react";

// /** useGet is a custom hook for get fetches typed to the generics provided
//  * @param url - url to fetch data from
//  * @returns data from the api typed to the genrics provided, loading and error states
//  * @example
//  interface CatFactAPIResponse {
//   data: [
//     {
//       fact: string;
//       length?: number;
//     }
//   ];
// }
//  * get data from the catfact api
//  * const { data, isLoading, error } = useGet<CatFactAPIResponse>("https://catfact.ninja/facts");
//  */

// /** TSFetchData is a generic interface that takes a type Placeholder as a parameter */
// interface ReturnData<Placeholder> {
//   /** loading method */
//   loading: boolean;
//   /** result of the fetch typed in generics */
//   data: Placeholder | null;
//   /** error message */
//   error: null | string;
//   /** functions can also be exported - this one will reset error and data states */
//   clear: () => void;
// }

// export function useGet<Placeholder>(url: string, run: boolean, token?: string): ReturnData<Placeholder> {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<Placeholder | null>(null);
//   const [error, setError] = useState<null | string>(null);
//   const [runOnFirstRender, setRunOnFirstRender] = useState(run);

//   const get = async () => {
//     setLoading(true);
//     setError(null);
//     const headers = new Headers()
//     if (token) {
//       headers.append("Authorization", `Bearer ${token}`)
//     }
//     const options = {
//       method: "GET",
//       headers
//     }
//     try {
//       const response = await fetch(url, options);
//       if (response.ok) {
//         const data: Placeholder = await response.json();
//         setData(data);
//       } else {
//         const { error } = await response.json();
//         setData(null);
//         setError(error);
//       }
//     } catch (error) {
//       const { message } = error as Error;
//       setError(message);
//       setData(null)
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clear = () => {
//     setError(null);
//     setData(null);
//   }

//   useEffect(() => {
//     if (runOnFirstRender) {
//       get();
//     } else {
//       setRunOnFirstRender(true);
//       setLoading(false);
//     }
//   }, [url]);

//   return { data, loading, error, clear };
// }
import React from 'react'

export const useGet = () => {
  return (
    <div>useGet</div>
  )
}
