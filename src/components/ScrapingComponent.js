import { useState } from 'react';

function ScrapingComponent() {
    const [keywords, setKeywords] = useState('');
    const [result, setResult] = useState(null);

    const handleScraping = async () => {
        try {
        const response = await fetch('/api/scraping-twitter', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keywords }),
        });

        const data = await response.json();
        setResult(data.data);
        } catch (error) {
        console.error('Erreur lors du scraping:', error);
        }
    };

    return (
        <div>
        <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Entrez des mots-clés"
        />
        <button onClick={handleScraping}>Lancer le scraping</button>

        {result && <div>Résultats: {JSON.stringify(result)}</div>}
        </div>
    );
}

export default ScrapingComponent;
