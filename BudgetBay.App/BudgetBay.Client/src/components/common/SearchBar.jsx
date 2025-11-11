import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-3xl mx-auto my-5 border border-border rounded-lg bg-surface overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for items..."
                className="flex-grow p-4 text-lg bg-transparent border-none outline-none text-text-base placeholder-text-muted"
            />
            <button type="submit" className="px-6 py-4 text-lg font-medium text-white bg-primary border-none cursor-pointer transition-colors hover:bg-primary-hover">
                Search
            </button>
        </form>
    );
};

export default SearchBar;