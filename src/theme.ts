/** @format */

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "blue",
  colors: {
    // Переопределяем primary под цвет заголовка
    blue: [
      "#e7f0ff",
      "#cce0ff",
      "#99c2ff",
      "#66a3ff",
      "#3385ff",
      "#0066ff", // базовый
      "#0052cc",
      "#003d99",
      "#002966",
      "#001433",
    ],
  },
  other: {
    primary: "#364FC7", // цвет заголовка вакансии
    darkPrimary: "#364FC7",
    black1: "#0F0F10",
    gray: "rgba(15, 15, 16, 0.5)",
    lightGray: "rgba(15, 15, 16, 0.3)",
    preLight: "rgba(15, 15, 16, 0.2)",
    ultraLight: "rgba(15, 15, 16, 0.1)",
    background: "#F6F6F7",
    white: "#FFFFFF",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});
