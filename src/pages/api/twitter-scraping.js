export default async function handler(req, res) {
    // Vérifier que la méthode est bien POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée, utilisez POST' });
    }

    try {
        // Récupérer les mots-clés ou le nom d'utilisateur envoyés par le front-end
        const { keywords, username } = req.body;

        if (!keywords && !username) {
        return res.status(400).json({ message: 'Mots-clés ou nom d\'utilisateur requis' });
    }

        // Appeler le microservice de scraping externe
        const response = await fetch('http://localhost:4000/scraping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords, username }),
        });

        if (!response.ok) {
        throw new Error('Erreur lors de la communication avec le microservice de scraping');
        }

        // Récupérer les données renvoyées par le microservice
        const data = await response.json();

      // Renvoyer les résultats au front-end
        return res.status(200).json({ message: 'Scraping réussi', data });

    } catch (error) {
        console.error('Erreur dans l\'API Next.js:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}  