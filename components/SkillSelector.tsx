
import React from 'react';
import { SKILLS } from '../constants';

interface Props {
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
}

const SkillSelector: React.FC<Props> = ({ selectedCodes, onChange }) => {
  const toggleSkill = (code: string) => {
    if (selectedCodes.includes(code)) {
      onChange(selectedCodes.filter(c => c !== code));
    } else {
      onChange([...selectedCodes, code]);
    }
  };

  // Only show skills from 6th to 9th for the simulator selection
  const simulatorSkills = SKILLS.filter(s => s.year >= 6);
  const grouped = simulatorSkills.reduce((acc, skill) => {
    acc[skill.year] = acc[skill.year] || [];
    acc[skill.year].push(skill);
    return acc;
  }, {} as Record<number, typeof simulatorSkills>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([year, yearSkills]) => (
        <div key={year}>
          <h4 className="font-bold text-slate-600 mb-3 border-l-4 border-blue-500 pl-3">{year}º Ano</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {yearSkills.map(skill => (
              <div 
                key={skill.code}
                onClick={() => toggleSkill(skill.code)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  selectedCodes.includes(skill.code) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedCodes.includes(skill.code) ? 'bg-blue-500 border-blue-500' : 'border-slate-300'
                }`}>
                  {selectedCodes.includes(skill.code) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 block">{skill.code}</span>
                  <span className="text-sm text-slate-700 font-medium">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillSelector;
