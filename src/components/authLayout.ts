import bidoraLogo from '../assets/Bidora logo with circle.svg';

interface authLayoutProps {
    formContent: string;
    topLink: string;
}

export function renderAuthLayout({
    formContent,
    topLink,
}: authLayoutProps): string {
    return `
    <div class="min-h-screen bg-white"></div>    `
}