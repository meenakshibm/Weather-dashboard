import type { ForecastResponse } from "../types/weather";


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getCoordinates(city: string) {
    const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );

    const data = await res.json();

    if (!data.length) {
        throw new Error("City not found");
    }

    return {
        lat: data[0].lat,
        lon: data[0].lon,
        city: data[0].name,
    };
}

export async function getForecast(
    lat: number,
    lon: number,
    units: "metric" | "imperial"
): Promise<ForecastResponse> {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );

    if (!res.ok) {
        throw new Error("Unable to fetch weather");
    }

    return res.json();
}