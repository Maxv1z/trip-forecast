import {useEffect, useState} from "react";
import "./CountDown.style.scss";

const Countdown = ({startDate}) => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [startDate]);

    const updateCountdown = () => {
        if (!startDate) return;

        const startDateObj = new Date(startDate);
        const currentDate = new Date();

        const totalSeconds = Math.floor((startDateObj - currentDate) / 1000);

        if (totalSeconds <= 0) {
            setCountdown({days: 0, hours: 0, minutes: 0, seconds: 0});
            return;
        }

        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        setCountdown({days, hours, minutes, seconds});
    };

    return (
        <div className="countdown">
            <div className="countdown-item">
                <span id="days" className="numbers">
                    {countdown.days < 10 ? "0" + countdown.days : countdown.days}
                </span>
                <span>Days</span>
            </div>
            <div className="countdown-item">
                <span id="hours" className="numbers">
                    {countdown.hours < 10 ? "0" + countdown.hours : countdown.hours}
                </span>
                <span>Hours</span>
            </div>
            <div className="countdown-item">
                <span id="minutes" className="numbers">
                    {countdown.minutes < 10 ? "0" + countdown.minutes : countdown.minutes}
                </span>
                <span>Minutes</span>
            </div>
            <div className="countdown-item">
                <span id="seconds" className="numbers">
                    {countdown.seconds < 10 ? "0" + countdown.seconds : countdown.seconds}
                </span>
                <span>Seconds</span>
            </div>
        </div>
    );
};

export default Countdown;
