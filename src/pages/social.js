import { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';

export async function getStaticProps() {
    try {
        const response = await fetch(`https://api.x.com/2/tweets?ids=1260294888811347969`, {
          headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
          }
      });

      const data = await response.json();
      console.log(data); // Affiche la réponse complète de l'API

      if (!data.data) {
          throw new Error("Aucun tweet trouvé");
      }

      return {
          props: {
            tweets: data.data, // L'API v2 retourne les tweets dans `data`
          },
      };
    } catch (error) {
        console.error('Erreur lors de la récupération des tweets:', error);
        return {
          props: {
            tweets: [], // Retourne un tableau vide en cas d'erreur
          },
        };
    }
}

const Tweets = ({ tweets }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTweets = async () => {
          try {
            // Appel à l'API proxy
            const res = await fetch('/api/scraping');
            const data = await res.json();

            // Mettre à jour l'état avec les données scrappées
            setLoading(false);
          } catch (error) {
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
                        {tweet.id}: {tweet.text}
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
          <Tweets tweets={tweets} />
        </div>
      </>
    );
}

