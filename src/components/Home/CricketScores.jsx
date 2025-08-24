// CricketScores.js - Cricket scores component
import React, { useState, useEffect } from 'react';

const CricketScores = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: "India",
      team2: "Australia",
      score: "287/3 (45.2) vs 284/8 (50.0)",
      status: "Live",
      matchType: "ODI",
      series: "Border-Gavaskar Trophy",
      venue: "Melbourne Cricket Ground",
      nextMatch: "Tomorrow at 13:30 IST"
    },
    {
      id: 2,
      team1: "England",
      team2: "South Africa",
      score: "192/4 (32.1) vs 291/7 (50.0)",
      status: "Live",
      matchType: "ODI",
      series: "ICC World Cup",
      venue: "Lord's Cricket Ground",
      nextMatch: "Today at 18:00 IST"
    },
    {
      id: 3,
      team1: "New Zealand",
      team2: "Pakistan",
      score: "Match starts in 2 hrs",
      status: "Upcoming",
      matchType: "T20",
      series: "T20 Series",
      venue: "Eden Park, Auckland",
      nextMatch: "Today at 20:00 IST"
    }
  ]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === "Live") {
          const scoreParts = match.score.split(" vs ");
          const score1 = scoreParts[0].split("/");
          const score2 = scoreParts[1].split("/");
          
          const updatedRuns1 = parseInt(score1[0]) + Math.floor(Math.random() * 3);
          const updatedOvers1 = parseFloat(score1[1].split(" ")[0].replace("(", "")) + 0.1;
          
          return {
            ...match,
            score: `${updatedRuns1}/${score1[1].split(" ")[0]} vs ${score2[0]}/${score2[1]}`
          };
        }
        return match;
      }));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Cricket Scores</h2>
      
      <div className="space-y-6">
        {matches.map(match => (
          <div key={match.id} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                match.status === "Live" ? "bg-red-100 text-red-800" : 
                match.status === "Upcoming" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              }`}>
                {match.status}
              </span>
              <span className="text-sm text-gray-500">{match.matchType}</span>
            </div>
            
            <div className="mb-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{match.team1}</span>
                <span className="text-gray-600">vs</span>
                <span className="font-semibold text-gray-800">{match.team2}</span>
              </div>
            </div>
            
            <div className="text-center my-3">
              <div className={`font-medium ${
                match.status === "Live" ? "text-red-600" : 
                match.status === "Upcoming" ? "text-blue-600" : "text-gray-600"
              }`}>
                {match.score}
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mb-2">
              {match.series}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <div><i className="fas fa-map-marker-alt mr-1"></i> {match.venue}</div>
              <div><i className="far fa-clock mr-1"></i> {match.nextMatch}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <i className="fas fa-sync-alt mr-2"></i>
        Scores update every 5 seconds
      </div>
    </div>
  );
};

export default CricketScores;