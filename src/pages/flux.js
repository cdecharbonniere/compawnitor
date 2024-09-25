import Parser from 'rss-parser';

export async function getStaticProps() {
    const parser = new Parser();
    const feed = await parser.parseURL('https://exemple-blog.com/rss');

    return {
        props: {
            articles: feed.items,
        },
    };
}

export default function Flux({ articles }) {
    return (
        <div>
        <h1>Derniers articles de blogs</h1>
        <ul>
            {articles.map((article, index) => (
            <li key={index}>
                <a href={article.link}>{article.title}</a>
            </li>
            ))}
        </ul>
        </div>
    );
}
