export interface TokenState {
  brand: {
    primary: string;
    accent: string;
    primaryLight: string;
    accentLight: string;
  };
  pipeline: {
    hot: string;
    qualified: string;
    engaged: string;
    warming: string;
    cold: string;
    hotLight: string;
    qualifiedLight: string;
    engagedLight: string;
    warmingLight: string;
    coldLight: string;
  };
  status: {
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    error: string;
    errorLight: string;
    info: string;
    infoLight: string;
  };
  neutral: {
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
  };
  spacing: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    "8": number;
    "10": number;
    "12": number;
  };
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadow: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontFamily: {
    heading: string;
    body: string;
    ui: string;
    stat: string;
  };
  typography: {
    h1: TypographyToken;
    h2: TypographyToken;
    h3: TypographyToken;
    h4: TypographyToken;
    body: TypographyToken;
    small: TypographyToken;
    label: TypographyToken;
    stat: TypographyToken;
  };
}

export interface TypographyToken {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
}
