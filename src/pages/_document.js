import Html from 'next/document';

export const metadata = {
    title: "compawnitor",
    description: "Automatisez votre veille concurrentielle",
};

export default function MyApp({ children }) {
    return (
        <Html lang="fr">
        <body
        >
            {children}
        </body>
        </Html>
    );
}