/** @format */

import { Card, Text, Group, Badge, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Vacancy } from "../types/vacancy";
import { useMantineTheme } from "@mantine/core";

interface Props {
  vacancy: Vacancy;
}

export default function VacancyCard({ vacancy }: Props) {
  const theme = useMantineTheme();

  const getBadgeStyle = (type?: Vacancy["space"]) => {
    switch (type) {
      case "remote":
        return {
          backgroundColor: theme.colors.blue[6],
          color: theme.white,
          border: "none",
        };
      case "hybrid":
        return {
          backgroundColor: theme.black,
          color: theme.white,
          border: "none",
        };
      case "office":
      default:
        return {
          backgroundColor: theme.other?.background || "#F6F6F7",
          color: theme.other?.black1 || "#0F0F10",
          border: `1px solid ${theme.other?.ultraLight || "#e9ecef"}`,
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
    if (typeof salary === "string" && salary.includes("–")) {
      return salary;
    }
    const num = typeof salary === "string" ? parseInt(salary, 10) : salary;
    if (isNaN(num)) return salary;
    return `${num.toLocaleString("ru-RU")} ₽`;
  };

  const badgeText = getBadgeText(vacancy.space);
  const badgeStyle = getBadgeStyle(vacancy.space);

  return (
    <Card
      padding={0}
      radius='md'
      withBorder
      style={{
        backgroundColor: theme.white,
        borderColor: theme.other?.ultraLight || "#e9ecef",
        boxShadow: "none",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}>
      <div style={{ padding: "24px" }}>
        <Text
          component='h3'
          fw={600}
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.other?.primary || "#364FC7",
            marginBottom: "16px",
          }}>
          {vacancy.name}
        </Text>

        <Group
          gap='16px'
          mb='16px'
          wrap='wrap'>
          <Text
            fw={700}
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: theme.other?.black1 || "#0F0F10",
            }}>
            {formatSalary(vacancy.salary)}
          </Text>
          {vacancy.experience && (
            <Text
              fw={400}
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                color: theme.other?.gray || "rgba(15,15,16,0.5)",
              }}>
              Опыт {vacancy.experience}
            </Text>
          )}
        </Group>

        <Text
          fw={400}
          style={{
            fontSize: "14px",
            lineHeight: "24px",
            color: theme.other?.gray || "rgba(15,15,16,0.5)",
            marginBottom: "8px",
          }}>
          {vacancy.company_name || "Компания не указана"}
        </Text>

        {badgeText && (
          <Badge
            radius='md'
            size='xs'
            style={{
              ...badgeStyle,
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "24px",
              padding: "0 12px",
              height: "20px",
              marginBottom: "8px",
            }}>
            {badgeText}
          </Badge>
        )}

        <Text
          fw={400}
          style={{
            fontSize: "14px",
            lineHeight: "24px",
            color: theme.other?.black1 || "#0F0F10",
            marginBottom: "24px",
          }}>
          {vacancy.city || "Город не указан"}
        </Text>

        {/* Кнопка Смотреть вакансию — чёрная всегда */}
        <Button
          component={Link}
          to={`/vacancies/${vacancy.id}`}
          variant='filled'
          style={{
            backgroundColor: "#0F0F10",
            color: "#FFFFFF",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#333333";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0F0F10";
          }}>
          Смотреть вакансию
        </Button>
      </div>
    </Card>
  );
}
