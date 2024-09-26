import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                <Link href="/">
                    COMPAWNITOR
                </Link>
                </div>

                <div className="flex space-x-4">
                <Link 
                    href="/"
                    className="text-gray-300 hover:text-white"
                >
                    Accueil
                </Link>

                <Link 
                    href="/concurrents"
                    className="text-gray-300 hover:text-white"
                >
                    Concurrents
                </Link>

                <Link 
                    href="/social"
                    className="text-gray-300 hover:text-white"
                >
                    Social
                </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;