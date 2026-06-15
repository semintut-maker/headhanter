/** @format */

import { IconSearch } from "@tabler/icons-react";
import { TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setSearch } from "../store/slices/filtersSlice";

export default function SearchInput() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.filters.search);
  return (
    <TextInput
      placeholder='Поиск по названию или компании'
      leftSection={<IconSearch size={16} />}
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      style={{ flex: 1 }}
    />
  );
}
