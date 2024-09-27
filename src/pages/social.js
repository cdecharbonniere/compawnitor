import { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';

const Tweets = () => {
    const [tweets, setTweets] = useState([]); // Initialiser l'état pour les tweets
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Pour capturer les erreurs

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                // Appel à l'API proxy de scraping
                const res = await fetch('/api/twitter-scraping'); // Appel à l'API
                const data = await res.json();

                if (res.ok) {
                    // Si l'appel est réussi, mettre à jour l'état avec les tweets
                    setTweets(data.tweets);
                } else {
                    // Gestion des erreurs
                    setError(data.error || 'Erreur lors du chargement des tweets.');
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des tweets :", error);
                setError("Erreur lors de la récupération des tweets.");
            } finally {
                setLoading(false); // Arrêter le chargement
            }
        };

        fetchTweets(); // Exécuter la fonction au chargement du composant
    }, []); // Utiliser un tableau vide pour appeler l'effet une seule fois

    return (
        <div>
            {loading ? (
                <p>Chargement des données...</p>
            ) : error ? (
                <p>{error}</p> // Afficher l'erreur si elle existe
            ) : (
                <ul>
                    {tweets.length > 0 ? (
                        tweets.map((tweet, index) => (
                            <li key={index}>
                                {tweet.id ? tweet.id : 'ID manquant'}: {tweet.text ? tweet.text : 'Texte manquant'}
                            </li>
                        ))
                    ) : (
                        <p>Aucun tweet trouvé.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default function Social() {
    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Dernières mentions sur Twitter
                </h1>
                <Tweets /> {/* Afficher le composant des tweets */}
            </div>
        </>
    );
}
