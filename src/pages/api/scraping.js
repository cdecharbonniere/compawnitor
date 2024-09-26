import axios from 'axios';
import * as cheerio from 'cheerio';
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
    try {
        // URL du site à scraper
        const url = 'https://www.hyland.com/fr/solutions/products/nuxeo-platform';

        // Requête GET pour récupérer la page HTML
        const response = await axios.get(url, {
            httpsAgent: new (require('https').Agent)({
                rejectUnauthorized: false, // Ignorer les erreurs SSL, à supprimer en production
            }),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            }
        });

        // Charger le HTML récupéré avec Cheerio
        const html = response.data;
         // Vérifie si la réponse contient bien du HTML
            if (typeof html !== 'string') {
                throw new Error('La réponse ne contient pas du HTML valide.');
            }

        // Charger le HTML avec Cheerio
        const $ = cheerio.load(html); // Ici on utilise Cheerio pour parser le HTML

        // Extraire les balises h2 et leurs liens associés
        const concurrents = [];
        $('h2').each((index, element) => {
            concurrents.push({
                title: $(element).text(),
                link: $(element).find('a').attr('href') || '', // Gérer le cas où il n'y a pas de lien
            });
        });

          // Connexion à MongoDB
        const client = await clientPromise;
        const db = client.db('compawnitor'); // Nom de la base de données
        const collection = db.collection('concurrents'); // Nom de la collection

          // Insérer les données scrappées dans MongoDB
        await collection.insertMany(concurrents);

        // Renvoyer les données sous forme de JSON
        res.status(200).json(concurrents);
    } catch (error) {
        console.error('Erreur lors du scraping :', error.toJSON ? error.toJSON() : error);

        // En cas d'erreur, renvoyer une réponse appropriée
        res.status(error.response ? error.response.status : 500).json({
            message: 'Erreur lors du scraping des données',
            details: error.message,
            config: error.config,
            response: error.response ? error.response.data : null,
        });
    }
}
