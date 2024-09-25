import axios from 'axios';
import cheerio from 'cheerio';

export async function getStaticProps() {
    const siteUrl = 'https://www.exemple-concurrent.com';
    const { data } = await axios.get(siteUrl);
    const $ = cheerio.load(data);

    const infos = [];
    $('div.product-card').each((i, element) => {
        const title = $(element).find('h2').text();
        const price = $(element).find('.price').text();
        infos.push({ title, price });
    });

    return {
        props: {
            infos,
        },
    };
}

export default function Concurrents({ infos }) {
    return (
        <div>
            <h1>Informations des concurrents</h1>
            <ul>
            {infos.map((info, index) => (
                <li key={index}>
                    {info.title}: {info.price}
                </li>
            ))}
            </ul>
        </div>
    );
}
