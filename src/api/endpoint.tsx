import useSwr from "swr";

const fetcher = (url: string) => fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    return parsedData.map((driver: any) => ({
      ...driver,
      position: isNaN(driver.position) ? null : driver.position
    }));
  });

interface Driver {
  position: number | null;
  driver_name: string;
  current_points: number;
  theoretical_max_points: number;
  can_win: string;
}

export const useDriverData = () => {
  const { data, error } = useSwr<Driver[]>('http://127.0.0.1:8000/win/2025/1', fetcher);
  return {
    drivers: data ? Object.values(data) : [],
    isLoading: !error && !data,
    isError: error
  };
};
