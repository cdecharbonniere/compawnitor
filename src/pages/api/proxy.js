// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        // Remplacez l'URL par l'URL que vous voulez atteindre
        const url = 'https://www.nuxeo.com/'; 
        
        // // Effectuer la requête à l'URL cible
        // const response = await axios({
        // method: req.method,
        // url,
        // headers: {
        //     'Content-Type': 'application/json',
        //     ...req.headers, // Reprendre les en-têtes de la requête d'origine
        // },
        // data: req.method === 'POST' ? req.body : null, // Passer les données si c'est une requête POST
        // });

        // Configuration d'Axios pour ignorer les certificats SSL (A SUPPRIMER EN PRODUCTION)
        const response = await axios.get(url, {
            httpsAgent: new (require('https').Agent)({
                rejectUnauthorized: false, // Ignorer les erreurs de certificat
            }),
        });

        // Renvoyer la réponse au client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        // En cas d'erreur, renvoyer une réponse d'erreur
        res.status(error.response ? error.response.status : 500).json({
        message: error.message,
        });
    }
}
