import React, { useEffect, useState } from 'react';
import { fetchSkills } from '../api';
import SkillCard from '../components/SkillCard';

export default function Home() {
  const skills = ["Python", "Java", "Full Stack Engineering", "Cloud Engineering", "AI Engineer"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Welcome to the Skill Swap Platform!</h1>
      <p className="mb-6 text-gray-600">Browse and request skill swaps here.</p>
      <hr className="mb-6" />
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Available Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 rounded hover:shadow-lg transition"
          >
            <p className="text-lg font-medium">{skill}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
