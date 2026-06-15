/** @format */

import { Card, Text, Group, Badge, Button } from "@mantine/core";
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

  // Форматируем зарплату: если приходит число, показываем как "100 000 ₽"
  // Если строка с дефисом, показываем как есть (диапазон)
  const formatSalary = (salary: string | number) => {
    if (typeof salary === "string" && salary.includes("–")) {
      return salary; // уже диапазон
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
        borderColor: theme.other?.ultraLight,
        boxShadow: "none",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}>
      <div style={{ padding: "16px" }}>
        {/* Название */}
        <Text
          component='h3'
          fw={600}
          style={{
            fontSize: "20px",
            lineHeight: "10px",
            color: theme.other?.primary || "#364FC7",
            marginBottom: "10px",
          }}>
          {vacancy.name}
        </Text>

        {/* Зарплата и опыт в одной строке */}
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

        {/* Компания */}
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

        {/* Бейдж режима работы */}
        {badgeText && (
          <Badge
            radius='sm'
            size='md'
            style={{
              ...badgeStyle,
              fontWeight: 600,
              fontSize: "8px",
              lineHeight: "20px",
              padding: "0 8px",
              height: "20px",
              marginBottom: "8px",
            }}>
            {badgeText}
          </Badge>
        )}

        {/* Город */}
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

        {/* Две кнопки */}
        <Group gap='12px'>
          <Button
            variant='filled'
            radius='md'
            style={{
              backgroundColor: theme.other?.black1 || "#0F0F10",
              color: theme.white,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.other?.gray;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.other?.black1;
            }}>
            Смотреть вакансию
          </Button>
          <Button
            variant='filled'
            radius='md'
            style={{
              backgroundColor: theme.other?.lightGray || "rgba(15,15,16,0.3)",
              color: theme.white,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.other?.gray;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.other?.lightGray;
            }}>
            Откликнуться
          </Button>
        </Group>
      </div>
    </Card>
  );
}
