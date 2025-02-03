'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const SortSelect = ({ sort, sortOrders }: {
  sort: string;
  sortOrders: string[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getFilterBySortUrl = (selectedSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", selectedSort);
    

    return `/search?${params.toString()}`
  };

  return (
    <Select onValueChange={(value: string) => router.push(getFilterBySortUrl(value))}>
      <SelectTrigger>
        <SelectValue placeholder='Sort By'/>
      </SelectTrigger>
      <SelectContent>
        {sortOrders.map((option) => (
          <SelectItem value={option} key={option} className={`${sort === option && 'font-bold'}`}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;