export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        card: string;
        info: string;
        success: string;
        warning: string;
        danger: string;
    };
    themeName: 'light' | 'dark';
}