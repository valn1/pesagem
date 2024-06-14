export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        card: string;
    };
    themeName: 'light' | 'dark';
}