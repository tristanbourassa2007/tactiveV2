export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-600 mt-1">Bienvenue dans votre espace TactiCE</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              🔍
            </div>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Administrateur</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 