import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export const Header = ({ title, showBack = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate('/')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-500"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-500">
        <Sparkles size={20} />
      </div>
    </header>
  );
};
