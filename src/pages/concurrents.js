import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';

const Concurrents = () => {
    const [concurrentsData, setConcurrentsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fonction pour récupérer les données scrappées via l'API proxy
        const fetchConcurrents = async () => {
            try {
                // Appel à l'API proxy
                const { data } = await axios.get('/api/proxy');

                // Mettre à jour l'état avec les données scrappées
                setConcurrentsData(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des concurrents :', error);
                setLoading(false);
            }
        };

        // Appel de la fonction de récupération des concurrents au chargement de la page
        fetchConcurrents();
    }, []);

    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Surveillance des Concurrents
                </h1>

                {loading ? (
                    <p>Chargement des données...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {concurrentsData.length > 0 ? (
                            concurrentsData.map((concurrent, index) => (
                                <div key={index} className="p-4 border rounded shadow">
                                    <h2 className="text-xl font-semibold">
                                        {concurrent.title}
                                    </h2>
                                    {concurrent.link && (
                                        <a href={concurrent.link} className="text-blue-500 underline">
                                            Voir plus
                                        </a>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Aucun concurrent trouvé.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Concurrents;

