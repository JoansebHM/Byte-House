interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
    return (
        <div className="mb-8 space-y-6">
            <div className="md:hidden text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tighter text-black dark:text-white">
                    HARDWARE PREMIUM
                </h1>
            </div>

            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="BUSCAR PRODUCTOS (Nombre, especificaciones...)"
                    className="w-full p-4 border border-black dark:border-white font-bold focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 font-bold px-4 py-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    BUSCAR
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
