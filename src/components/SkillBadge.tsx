import React from 'react';

interface SkillBadgeProps {
  name: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-3">
      <span className="text-gray-800 font-medium">{name}</span>
    </div>
  );
};

export default SkillBadge;