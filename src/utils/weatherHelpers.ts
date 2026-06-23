import type { ForecastItem } from "../types/weather";

export interface DailyForecast {
    date: string;
    items: ForecastItem[];
    min: number;
    max: number;
    icon: string;
}

export function groupForecastByDay(
    forecast: ForecastItem[]
): DailyForecast[] {
    const grouped: Record<string, ForecastItem[]> = {};

    forecast.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!grouped[date]) {
            grouped[date] = [];

        }

        grouped[date].push(item);
    });

    return Object.entries(grouped)
        .slice(0, 5)
        .map(([date, items]) => ({
            date,
            items,
            min: Math.min(...items.map((i) => i.main.temp_min)),
            max: Math.max(...items.map((i) => i.main.temp_max)),
            icon: items[0].weather[0].icon,
        }));
}