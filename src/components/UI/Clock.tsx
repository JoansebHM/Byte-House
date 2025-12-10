import { useEffect, useState } from "react";
import { Clock as ClockIcon } from "lucide-react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-2 p-4 border border-white font-inconsolata">
            <ClockIcon size={20} />
            <span className="font-bold text-lg">
                {time.toLocaleTimeString([], { hour12: false })}
            </span>
        </div>
    );
};

export default Clock;
