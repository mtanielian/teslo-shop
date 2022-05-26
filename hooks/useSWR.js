import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useFetchData = ({ url, config = {} }) => {
  const { data, error }= useSWR(`/api${url}`, fetcher, config)
  
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }

}