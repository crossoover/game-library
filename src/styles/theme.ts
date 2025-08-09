export const darkTheme = {
  colors: {
    background: {
      screen: "#13121F",
      sidebar: "#1C1A2E",
      input: "#25233A",
      button: "#0061FF",
      mobileMenuOverlay: "#1c1a2e60",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#1C1A2E",
      active: "#0061FF",
    },
  },
  spacing: {
    xxs: "1px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "8px",
    md: "16px",
    lg: "32px",
    full: "9999px",
  },
  transitions: {
    ultraFast: "80ms ease-in-out",
    fast: "150ms ease-in-out",
    medium: "250ms ease-in-out",
    slow: "350ms ease-in-out",
  },
  transforms: {
    regularUpScale: "scale(1.1)",
  },
  dimensions: {
    buttons: {
      iconButton: {
        width: "44px",
        height: "44px",
      },
      button: {
        minHeight: "44px",
      },
    },
  },
  typography: {
    fontSizes: {
      xss: "10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

export const lightTheme = { ...darkTheme };

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        screen: string;
        sidebar: string;
        input: string;
        button: string;
        mobileMenuOverlay: string;
      };
      text: {
        primary: string;
        secondary: string;
        active: string;
      };
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    transitions: {
      ultraFast: string;
      fast: string;
      medium: string;
      slow: string;
    };
    transforms: {
      regularUpScale: string;
    };
    dimensions: {
      buttons: {
        iconButton: {
          width: string;
          height: string;
        };
        button: {
          minHeight: string;
        };
      };
    };
    typography: {
      fontSizes: {
        xss: string;
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        "2xl": string;
      };
      fontWeights: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
  }
}
