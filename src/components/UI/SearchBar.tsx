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

            <div className="relative flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="BUSCAR PRODUCTOS..."
                    className="w-full p-4 pr-32 border border-black dark:border-white font-bold focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 text-sm md:text-base"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 font-bold px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm md:text-base">
                    BUSCAR
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
