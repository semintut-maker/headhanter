/** @format */

import { Group, Title, Anchor, Box } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";

export default function Header() {
  const theme = useMantineTheme();
  return (
    <Box
      style={{
        backgroundColor: theme.white,
        borderBottom: `1px solid ${theme.other?.ultraLight || "#e9ecef"}`,
      }}>
      <Group
        justify='space-between'
        align='center'
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "12px 24px",
        }}>
        {/* Логотип слева */}
        <Group
          gap='xs'
          align='center'>
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#e31e24",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 20,
              color: "white",
            }}>
            hh
          </div>
          <Title
            order={3}
            style={{
              color: theme.other?.black1 || "#0F0F10",
              fontWeight: 700,
              fontSize: "16px",
              margin: 0,
            }}>
            .FrontEnd
          </Title>
        </Group>

        {/* Меню по центру */}
        <Group gap='xl'>
          <Anchor
            href='#'
            style={{
              color: theme.other?.black1 || "#0F0F10",
              fontWeight: 500,
              fontSize: "14px",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.other?.ultraLight || "#f1f3f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}>
            Вакансии FE
          </Anchor>

          <Group
            gap={4}
            align='center'>
            <IconUserCircle
              size={18}
              stroke={1.5}
              color={theme.other?.gray || "rgba(15,15,16,0.5)"}
            />
            <Anchor
              href='#'
              style={{
                color: theme.other?.gray || "rgba(15,15,16,0.5)",
                fontWeight: 500,
                fontSize: "16px",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.other?.ultraLight || "#f1f3f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}>
              Обо мне
            </Anchor>
          </Group>
        </Group>

        {/* Пустой блок справа для баланса */}
        <div style={{ width: 100 }} />
      </Group>
    </Box>
  );
}
