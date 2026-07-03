import { useNavigate } from 'react-router-dom';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${character.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-sm">
          <img
            src={character.avatar}
            alt={character.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23fbcfe8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23ec4899'%3E${character.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>
        
        <h3 className="mb-1 text-base font-bold text-gray-800">{character.name}</h3>
        
        <div className="flex flex-wrap justify-center gap-0.5">
          {character.personality.map((trait) => (
            <span
              key={trait}
              className="rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-primary-600"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
