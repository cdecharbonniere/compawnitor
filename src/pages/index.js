import NavBar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Tableau de bord de la veille concurrentielle
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Concurrents
            </h2>
            <p className="text-gray-700">
              Surveillez les sites et les nouveautés de vos concurrents ici.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Réseaux sociaux
            </h2>
            <p className="text-gray-700">
              Analysez les mentions de vos concurrents sur les réseaux sociaux.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Flux RSS
            </h2>
            <p className="text-gray-700">
              Recevez les dernières publications des blogs et médias sectoriels.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
