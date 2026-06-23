import { useNavigate } from "react-router-dom";
import type { DailyForecast } from "../utils/weatherHelpers";

interface Props {
    day: DailyForecast;
}

export default function ForecastCard({ day }: Props) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() =>
                navigate(`/day/${day.date}`, {
                    state: day.items,
                })
            }
            className="cursor-pointer rounded-xl bg-white p-4 shadow"
        >
            <h3 className="font-semibold">
                {new Date(day.date).toLocaleDateString(undefined, {
                    weekday: "long",
                })}
            </h3>

            <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt=""
            />

            <p>
                {Math.round(day.min)}° / {Math.round(day.max)}°
            </p>
        </div>
    );
}