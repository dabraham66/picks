import { useState } from "react";

export default function WeeklyPicks() {
  const [fullName, setFullName] = useState("");
  const [picks, setPicks] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [chicagoScore, setChicagoScore] = useState("");
  const [minnesotaScore, setMinnesotaScore] = useState("");

  const games = [
    { teamA: "Tampa Bay", teamB: "Atlanta" },
    { teamA: "Cincinnati", teamB: "Cleveland" },
    { teamA: "Miami", teamB: "Indianapolis" },
    { teamA: "Las Vegas", teamB: "New England" },
    { teamA: "Arizona", teamB: "New Orleans" },
    { teamA: "Pittsburgh", teamB: "New York J" },
    { teamA: "New York G", teamB: "Washington" },
    { teamA: "Carolina", teamB: "Jacksonville" },
    { teamA: "Tennessee", teamB: "Denver" },
    { teamA: "San Francisco", teamB: "Seattle" },
    { teamA: "Detroit", teamB: "Green Bay" },
    { teamA: "Houston", teamB: "Los Angeles C" },
    { teamA: "Baltimore", teamB: "Buffalo" },
    { teamA: "Minnesota", teamB: "Chicago" },
  ];

  const handlePick = (gameIndex, team) => {
    setPicks({ ...picks, [gameIndex]: team });
  };

  const handleSubmit = () => {
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (Object.keys(picks).length !== games.length) {
      setError("Please make a pick for every game.");
      return;
    }
    setError("");
    setSuccess(true);
    setShowSummary(false);

    const submission = {
      fullName,
      picks,
      chicagoScore,
      minnesotaScore,
      timestamp: new Date().toISOString(),
    };
    console.log("Submitted picks:", submission);
    // Simulate saving to backend
  };

  const combinedScore =
    parseInt(chicagoScore || "0", 10) + parseInt(minnesotaScore || "0", 10);

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-100 min-h-screen">
      <input
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-lg mb-4"
      />

      {fullName && (
        <p className="text-xl font-semibold text-center mb-4">{fullName}</p>
      )}

      <h1 className="text-2xl font-bold text-center mb-6">Weekly Football Picks</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">Picks submitted successfully!</p>}

      <div className="space-y-4">
        {games.map((game, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
            <button
              onClick={() => handlePick(index, game.teamA)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                picks[index] === game.teamA ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {game.teamA}
            </button>

            <span className="mx-2 text-gray-600">vs</span>

            <button
              onClick={() => handlePick(index, game.teamB)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                picks[index] === game.teamB ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {game.teamB}
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setShowSummary(true)}
          className="w-1/2 bg-yellow-500 text-white py-2 rounded-xl shadow hover:bg-yellow-600"
        >
          Review Picks
        </button>
        <button
          onClick={handleSubmit}
          className="w-1/2 bg-green-600 text-white py-2 rounded-xl shadow hover:bg-green-700"
        >
          Submit Picks
        </button>
      </div>

      {showSummary && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Your Picks:</h2>
          <ul className="list-disc list-inside">
            {games.map((game, index) => (
              <li key={index}>
                {game.teamA} vs {game.teamB}: <strong>{picks[index] || "No pick"}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Enter Final Scores</h2>
        <div className="flex items-center justify-between space-x-4">
          <input
            type="number"
            placeholder="Minnesota"
            value={minnesotaScore}
            onChange={(e) => setMinnesotaScore(e.target.value)}
            className="w-1/2 border border-gray-300 px-4 py-2 rounded-lg"
          />
          <span className="font-bold">vs</span>
          <input
            type="number"
            placeholder="Chicago"
            value={chicagoScore}
            onChange={(e) => setChicagoScore(e.target.value)}
            className="w-1/2 border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <p className="text-center text-lg font-medium mt-4">
          Combined Score: {combinedScore}
        </p>
      </div>
    </div>
  );
}
