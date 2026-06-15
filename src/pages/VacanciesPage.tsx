/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  Title,
  Space,
  Box,
  TextInput,
  Button,
  Group,
  Flex,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { RootState, AppDispatch } from "../store/store";
import {
  fetchVacanciesStart,
  fetchVacanciesSuccess,
  fetchVacanciesFailure,
} from "../store/slices/vacanciesSlice";
import { setCurrentPage, setTotalPages } from "../store/slices/paginationSlice";
import { setSearch } from "../store/slices/filtersSlice";
import { fetchJobs } from "../api/jobsApi";
import CitySelect from "../components/CitySelect";
import SkillsInput from "../components/SkillsInput";
import VacanciesList from "../components/VacanciesList";
import PaginationComponent from "../components/PaginationComponent";
import { useDebounce } from "../hooks/useDebounce";
import { useMantineTheme } from "@mantine/core";

export default function VacanciesPage() {
  const theme = useMantineTheme();
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.pagination,
  );

  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [filters.search, filters.city, filters.skills, dispatch]);

  useEffect(() => {
    const loadVacancies = async () => {
      dispatch(fetchVacanciesStart());
      try {
        const { items, total } = await fetchJobs({
          search: filters.search,
          city: filters.city === "" ? undefined : filters.city,
          skills: filters.skills,
          page: currentPage,
          limit: itemsPerPage,
        });
        dispatch(fetchVacanciesSuccess(items));
        const totalPages = Math.ceil(total / itemsPerPage);
        dispatch(setTotalPages(totalPages));
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Ошибка загрузки";
        dispatch(fetchVacanciesFailure(errorMessage));
      }
    };
    loadVacancies();
  }, [
    filters.search,
    filters.city,
    filters.skills,
    currentPage,
    itemsPerPage,
    dispatch,
  ]);

  const handleSearchClick = () => {
    dispatch(setSearch(localSearch));
    dispatch(setCurrentPage(1));
  };

  return (
    <Box
      style={{
        backgroundColor: theme.other?.background || "#FFFFFF",
        minHeight: "100vh",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}>
      <Container size='xl'>
        {/* Верхняя строка */}
        <Flex
          justify='space-between'
          align='flex-start'
          wrap='wrap'
          gap='md'
          mb='lg'>
          <Box style={{ maxWidth: "500px" }}>
            <Title
              order={1}
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: theme.other?.black1 || "#0F0F10",
                margin: 0,
                lineHeight: 1.2,
              }}>
              Список вакансий
            </Title>
            <Title
              order={2}
              style={{
                fontSize: "20px",
                fontWeight: 400,
                color: theme.other?.gray || "rgba(15,15,16,0.5)",
                margin: 0,
                marginTop: "4px",
              }}>
              по профессии Frontend-разработчик
            </Title>
          </Box>

          <Group
            align='flex-end'
            gap='sm'
            style={{ flex: 1, justifyContent: "flex-end" }}>
            <TextInput
              placeholder='Должность или название компании'
              leftSection={<IconSearch size={16} />}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 480 }}
            />
            <Button
              onClick={handleSearchClick}
              radius='md'
              style={{
                backgroundColor: theme.other?.primary || "#364FC7",
                color: theme.white,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.other?.darkPrimary || "#2b3fa0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.other?.primary || "#364FC7";
              }}>
              Найти
            </Button>
          </Group>
        </Flex>

        <Grid gutter='xl'>
          {/* ЛЕВАЯ КОЛОНКА — два отдельных блока */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            {/* Блок 1: Ключевые навыки */}
            <Paper
              shadow='none'
              p='md'
              radius='md'
              style={{ backgroundColor: theme.white, marginBottom: "24px" }}>
              <Title
                order={3}
                size='h4'
                mb='md'
                style={{ fontWeight: 600 }}>
                Ключевые навыки
              </Title>
              <SkillsInput />
            </Paper>

            {/* Блок 2: Город */}
            <Paper
              shadow='none'
              p='md'
              radius='md'
              style={{ backgroundColor: theme.white }}>
              <CitySelect />
            </Paper>
          </Grid.Col>

          {/* Правая колонка */}
          <Grid.Col span={{ base: 12, md: 9 }}>
            <VacanciesList />
            <Space h='xl' />
            <PaginationComponent />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
