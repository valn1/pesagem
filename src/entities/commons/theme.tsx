export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
    themeName: 'light' | 'dark';
}