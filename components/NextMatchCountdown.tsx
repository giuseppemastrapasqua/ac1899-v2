"use client";

import { useEffect, useState } from "react";

type Props = {
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  matchDate: string;
  competition: string;
};

export default function NextMatchCountdown({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  matchDate,
  competition,
}: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    function updateCountdown() {
      const target = new Date(matchDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [matchDate]);

  const matchDayMessage = timeLeft.expired
    ? "MATCHDAY"
    : timeLeft.days === 0
    ? "SI GIOCA OGGI"
    : timeLeft.days === 1
    ? "DOMANI SI GIOCA"
    : "PROSSIMA PARTITA";

  return (
    <div style={card}>
      <p style={label}>⏳ {matchDayMessage}</p>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 8,
  }}
>
  {homeLogo && (
    <img
      src={homeLogo}
      alt={homeTeam}
      style={{
        width: 32,
        height: 32,
        objectFit: "contain",
      }}
    />
  )}

  <h3 style={teams}>
    {homeTeam} vs {awayTeam}
  </h3>

  {awayLogo && (
    <img
      src={awayLogo}
      alt={awayTeam}
      style={{
        width: 32,
        height: 32,
        objectFit: "contain",
      }}
    />
  )}
</div>

      <p style={competitionStyle}>{competition}</p>

      <div style={grid}>
        <TimeBox label="G" value={timeLeft.days} />
        <TimeBox label="H" value={timeLeft.hours} />
        <TimeBox label="M" value={timeLeft.minutes} />
        <TimeBox label="S" value={timeLeft.seconds} />
      </div>

      <p style={dateStyle}>
        {new Date(matchDate).toLocaleDateString("it-IT")} ·{" "}
        {new Date(matchDate).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div style={timeBox}>
      <strong style={timeValue}>{value}</strong>
      <span style={timeLabel}>{label}</span>
    </div>
  );
}

const card = {
  background: "linear-gradient(135deg,#111827,#7f1d1d)",
  color: "white",
  padding: 14,
  textAlign: "center" as const,
};

const label = {
  margin: "0 0 8px",
  color: "#fecaca",
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 1,
};

const teams = {
  margin: "0 0 6px",
  fontSize: 22,
  lineHeight: 1.2,
};

const competitionStyle = {
  margin: "0 0 12px",
  color: "#d1d5db",
  fontSize: 14,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 6,
};

const timeBox = {
  background: "rgba(255,255,255,0.12)",
  padding: "8px 4px",
};

const timeValue = {
  display: "block",
  fontSize: 20,
  lineHeight: 1,
};

const timeLabel = {
  display: "block",
  marginTop: 4,
  fontSize: 10,
  color: "#f3f4f6",
};

const dateStyle = {
  margin: "12px 0 0",
  fontSize: 13,
  color: "#e5e7eb",
};