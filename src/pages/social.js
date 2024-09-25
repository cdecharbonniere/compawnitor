import Twitter from 'twitter';

export async function getStaticProps() {
  const client = new Twitter({
    consumer_key: 'your_consumer_key',
    consumer_secret: 'your_consumer_secret',
    access_token_key: 'your_access_token_key',
    access_token_secret: 'your_access_token_secret',
  });

  const params = { q: 'concurrent1', count: 10 };
  const tweets = await client.get('search/tweets', params);

  return {
    props: {
      tweets: tweets.statuses,
    },
  };
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
