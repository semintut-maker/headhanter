/** @format */

import { Select } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setCity } from "../store/slices/filtersSlice";

const cityOptions = [
  { value: "", label: "Все города" },
  { value: "Москва", label: "Москва" },
  { value: "Санкт-Петербург", label: "Санкт-Петербург" },
];

export default function CitySelect() {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.filters.city);

  return (
    <Select
      placeholder='Все города'
      leftSection={<IconMapPin size={16} />}
      data={cityOptions}
      value={city}
      onChange={(val) => dispatch(setCity(val || ""))}
      clearable={false}
      styles={{
        input: {
          color: city === "" ? "gray" : "inherit",
        },
        option: {
          color: "inherit",
        },
      }}
    />
  );
}
