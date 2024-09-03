import Link from 'next/link';

const Header = () => (
    <header className="text-black p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold italic text-red-600">RADIOROGUE</h1>
            {/* <div className="flex space-x-4">
                <Link href="/author-signin">
                    <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700">
                        Author Signin
                    </button>
                </Link>
            </div> */}
        </div>
    </header>
);

export default Header;
