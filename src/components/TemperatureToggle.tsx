interface Props {
    unit: "metric" | "imperial";
    onChange(unit: "metric" | "imperial"): void;
}

export default function TemperatureToggle({
    unit,
    onChange,
}: Props) {
    return (
        <div className="mb-4 flex gap-2">
            <button
                onClick={() => onChange("metric")}
                className={`rounded px-3 py-1 ${unit === "metric"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
            >
                °C
            </button>

            <button
                onClick={() => onChange("imperial")}
                className={`rounded px-3 py-1 ${unit === "imperial"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
            >
                °F
            </button>
        </div>
    );
}