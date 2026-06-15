/** @format */

import { Stack, Loader, Center, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import VacancyCard from "./VacancyCard";

export default function VacanciesList() {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.vacancies,
  );

  if (loading)
    return (
      <Center h={200}>
        <Loader />
      </Center>
    );
  if (error)
    return (
      <Center h={200}>
        <Text c='red'>Ошибка: {error}</Text>
      </Center>
    );
  if (!items.length)
    return (
      <Center h={200}>
        <Text>Вакансии не найдены</Text>
      </Center>
    );

  return (
    <Stack gap='lg'>
      {items.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          vacancy={vacancy}
        />
      ))}
    </Stack>
  );
}
