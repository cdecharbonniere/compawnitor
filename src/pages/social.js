import Twitter from 'twitter';

export async function getStaticProps() {
  try {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    const params = { q: 'concurrent1', count: 10 };
    const tweets = await client.get('search/tweets', params);

    return {
      props: {
        tweets: tweets.statuses,
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

export default function Social({ tweets }) {
  return (
    <div>
      <h1>Dernières mentions sur Twitter</h1>
      <ul>
        {tweets.map((tweet, index) => (
          <li key={index}>
            {tweet.user.name}: {tweet.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
