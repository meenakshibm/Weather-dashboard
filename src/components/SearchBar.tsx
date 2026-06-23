import { useState } from "react";

export default function SearchBar({
    onSearch,
}: {
    onSearch: (city: string) => void;
}) {
    const [city, setCity] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (!city.trim()) return;

                onSearch(city);
            }}
            className="mb-4 flex gap-2"
        >
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city..."
                className="flex-1 rounded border p-2"
            />

            <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white"
            >
                Search
            </button>
        </form>
    );
}