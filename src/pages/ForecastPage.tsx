import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TemperatureToggle from "../components/TemperatureToggle";
import ForecastCard from "../components/ForecastCard";
import { getCoordinates, getForecast } from "../api/openWeather";
import type { ForecastResponse } from "../types/weather";
import { groupForecastByDay } from "../utils/weatherHelpers";

export default function ForecastPage() {
    const [weather, setWeather] =
        useState<ForecastResponse | null>(null);

    const [unit, setUnit] =
        useState<"metric" | "imperial">("metric");

    const [coords, setCoords] =
        useState<{ lat: number; lon: number } | null>(
            null
        );

    const [error, setError] = useState("");

    async function loadForecast(
        lat: number,
        lon: number
    ) {
        try {
            const data = await getForecast(lat, lon, unit);

            setWeather(data);
            setError("");
        } catch {
            setError("Failed to fetch weather");
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };

                setCoords(location);

                loadForecast(location.lat, location.lon);
            },
            () => {
                setError("Search a city to continue");
            }
        );
    }, []);

    useEffect(() => {
        if (coords) {
            loadForecast(coords.lat, coords.lon);
        }
    }, [unit]);

    async function searchCity(city: string) {
        try {
            const result = await getCoordinates(city);

            const newCoords = {
                lat: result.lat,
                lon: result.lon,
            };

            setCoords(newCoords);

            loadForecast(result.lat, result.lon);
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        }
    }

    const days = weather
        ? groupForecastByDay(weather.list)
        : [];

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="mb-4 text-2xl font-bold">
                Weather Forecast
            </h1>

            <SearchBar onSearch={searchCity} />

            <TemperatureToggle
                unit={unit}
                onChange={setUnit}
            />

            {error && (
                <p className="mb-4 text-red-500">
                    {error}
                </p>
            )}

            {weather && (
                <>
                    <h2 className="mb-4 text-lg font-medium">
                        {weather.city.name}
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        {days.map((day) => (
                            <ForecastCard
                                key={day.date}
                                day={day}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}