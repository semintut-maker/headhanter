/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Divider,
  Loader,
  Center,
  Button,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { fetchJobById } from "../api/jobsApi";
import type { Vacancy } from "../types/vacancy";

export default function VacancyPage() {
  const theme = useMantineTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await fetchJobById(Number(id));
        setVacancy(data);
        setError(null);
      } catch {
        // Переменная err не нужна, просто устанавливаем ошибку
        setError("Не удалось загрузить вакансию");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <Center h={300}>
        <Loader />
      </Center>
    );
  }

  if (error || !vacancy) {
    return (
      <Center h={300}>
        <Text c='red'>{error || "Вакансия не найдена"}</Text>
      </Center>
    );
  }

  const getBadgeStyle = (type?: Vacancy["space"]) => {
    switch (type) {
      case "remote":
        return { backgroundColor: theme.colors.blue[6], color: theme.white };
      case "hybrid":
        return { backgroundColor: theme.black, color: theme.white };
      default:
        return {
          backgroundColor: theme.other?.background,
          color: theme.other?.black1,
        };
    }
  };

  const getBadgeText = (type?: Vacancy["space"]) => {
    switch (type) {
      case "remote":
        return "Можно удалённо";
      case "office":
        return "Офис";
      case "hybrid":
        return "Гибрид";
      default:
        return null;
    }
  };

  const formatSalary = (salary: string | number) => {
    if (typeof salary === "string" && salary.includes("–")) return salary;
    const num = typeof salary === "string" ? parseInt(salary, 10) : salary;
    if (isNaN(num)) return salary;
    return `${num.toLocaleString("ru-RU")} ₽`;
  };

  return (
    <Container
      size='md'
      py='xl'>
      <Button
        variant='subtle'
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => navigate(-1)}
        mb='md'>
        Назад к списку
      </Button>

      <Paper
        shadow='xs'
        p='xl'
        radius='md'
        withBorder>
        <Title
          order={2}
          style={{ color: theme.other?.primary, marginBottom: 8 }}>
          {vacancy.name}
        </Title>

        <Group
          gap='16px'
          wrap='wrap'
          mb='16px'>
          <Text
            fw={700}
            size='lg'>
            {formatSalary(vacancy.salary)}
          </Text>
          {vacancy.experience && (
            <Text
              size='sm'
              c='dimmed'>
              Опыт {vacancy.experience}
            </Text>
          )}
        </Group>

        <Group
          gap='xs'
          wrap='wrap'
          mb='16px'>
          <Text
            size='sm'
            c='dimmed'>
            {vacancy.company_name}
          </Text>
          {getBadgeText(vacancy.space) && (
            <Badge
              radius='xl'
              style={{
                ...getBadgeStyle(vacancy.space),
                fontWeight: 500,
                fontSize: 12,
                padding: "0 12px",
                height: 24,
              }}>
              {getBadgeText(vacancy.space)}
            </Badge>
          )}
          <Text
            size='sm'
            c='dimmed'>
            {vacancy.city}
          </Text>
        </Group>

        <Divider my='lg' />

        {vacancy.description && (
          <>
            <Title
              order={4}
              mb='xs'>
              О вакансии
            </Title>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {vacancy.description}
            </Text>
            <Divider my='lg' />
          </>
        )}

        {vacancy.about_company && (
          <>
            <Title
              order={4}
              mb='xs'>
              О компании
            </Title>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {vacancy.about_company}
            </Text>
          </>
        )}
      </Paper>
    </Container>
  );
}
