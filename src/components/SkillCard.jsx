// SkillCard.jsx - Card to display a skill

import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold">{skill.name}</h2>
    </div>
  );
} 