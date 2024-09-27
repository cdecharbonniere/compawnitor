import { useEffect, useState } from 'react';
import { getStaticProps as fetchTweetsFromAPI } from './api/twitter-scraping'; // Mettez à jour le chemin d'importation
import NavBar from '../components/Navbar';

const Tweets = ({ initialTweets }) => {
    const [tweets, setTweets] = useState(initialTweets); // Initialiser l'état avec les tweets passés en props
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                // Appel à l'API proxy
                const res = await fetch('/api/scraping');
                const data = await res.json();

                // Mettre à jour l'état avec les données scrappées
                setTweets(data || []); // Mettre à jour l'état avec les nouveaux tweets scrappés
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des tweets :", error);
                setLoading(false);
            }
        };

        fetchTweets();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Chargement des données...</p>
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

export default function Social({ tweets }) {
    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Dernières mentions sur Twitter
                </h1>
                <Tweets initialTweets={tweets} /> {/* Passer les tweets initialement récupérés */}
            </div>
        </>
    );
}

// Appeler getStaticProps pour récupérer les données à la compilation
export async function getStaticProps() {
    const props = await fetchTweetsFromAPI(); // Utiliser la fonction importée
    return {
        props,
    };
}
