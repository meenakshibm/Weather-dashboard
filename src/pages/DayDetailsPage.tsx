import { useLocation, useNavigate } from "react-router-dom";
import type { ForecastItem } from "../types/weather";

export default function DayDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const items = location.state as ForecastItem[];

    if (!items) {
        return (
            <div className="p-4">
                <button onClick={() => navigate("/")}>
                    Back
                </button>

                <p>No data available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4">
            <button
                className="mb-4 rounded bg-gray-200 px-3 py-2"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.dt}
                        className="flex items-center justify-between rounded bg-white p-3 shadow"
                    >
                        <div>
                            {new Date(item.dt_txt).toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </div>

                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt=""
                        />

                        <div>
                            {Math.round(item.main.temp)}°
                        </div>

                        <div>
                            {item.weather[0].description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}