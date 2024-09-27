let requetesEffectuees = 0; // Variable globale pour suivre le nombre de requêtes
const limiteRequetes = 10000; // Limite de 10 000 requêtes par mois
const intervalleRequetes = 4.5 * 60 * 1000; // Délai de 4,5 minutes (en millisecondes)

// Fonction pour attendre le délai entre les requêtes
const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
    try {
        // Vérifier si la limite de requêtes est atteinte
        if (requetesEffectuees >= limiteRequetes) {
            return res
                .status(429)
                .json({ error: 'Limite de requêtes atteinte pour ce mois.' });
        }

        // Simuler un délai de 4,5 minutes entre les requêtes
        await attendre(intervalleRequetes);

        // Appel au microservice de scraping
        const scrapingRes = await fetch('http://localhost:4000/scraping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: 'AI', // Remplacer par des mots-clés dynamiques si nécessaire
            }),
        });

        const scrapingData = await scrapingRes.json();

        if (scrapingRes.ok) {
            // Incrémenter le nombre de requêtes
            requetesEffectuees++;

            // Répondre avec les données scrappées
            return res.status(200).json({ tweets: scrapingData.data });
        } else {
            // En cas d'erreur dans le scraping
            return res.status(500).json({ error: 'Erreur lors du scraping' });
        }
    } catch (error) {
        console.error("Erreur dans l'API de scraping :", error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
}
