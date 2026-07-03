import { CharacterCard } from '../components/CharacterCard';
import { characters } from '../data/characters';

export const CharacterSelect = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="sticky top-0 z-50 bg-white/90 px-3 py-3 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            假面男友
          </h1>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        </div>
      </div>
      
      <main className="px-3 py-4">
        <div className="mb-4 text-center">
          <h2 className="mb-1 text-lg font-bold text-gray-800">选择你的专属男友</h2>
          <p className="text-xs text-gray-500">点击卡片开始聊天</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </main>
    </div>
  );
};
