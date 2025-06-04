import Header from '@/components/Header';

export default function Home() {
  const stats = [
    { label: 'Projets actifs', value: '12', icon: '📁', color: 'bg-blue-500' },
    { label: 'Tâches terminées', value: '48', icon: '✅', color: 'bg-green-500' },
    { label: 'Équipe', value: '8', icon: '👥', color: 'bg-purple-500' },
    { label: 'Revenus', value: '€24.5k', icon: '💰', color: 'bg-yellow-500' },
  ];

  const recentProjects = [
    { name: 'Site E-commerce', progress: 75, status: 'En cours', dueDate: '15 Jan' },
    { name: 'App Mobile', progress: 60, status: 'En cours', dueDate: '22 Jan' },
    { name: 'Dashboard Analytics', progress: 90, status: 'Presque fini', dueDate: '08 Jan' },
    { name: 'Refonte UI/UX', progress: 30, status: 'Début', dueDate: '30 Jan' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Projets récents</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Voir tout
              </button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{project.name}</h3>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Presque fini' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                    <p className="text-sm text-slate-500 mt-1">{project.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Actions rapides</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <span>➕</span>
                  <span>Nouveau projet</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors">
                  <span>👥</span>
                  <span>Inviter membre</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors">
                  <span>📊</span>
                  <span>Voir rapports</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Activité récente</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-900">Projet "Site E-commerce" mis à jour</p>
                    <p className="text-xs text-slate-500">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-900">Tâche "Design header" terminée</p>
                    <p className="text-xs text-slate-500">Il y a 4 heures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-slate-900">Nouveau membre ajouté à l'équipe</p>
                    <p className="text-xs text-slate-500">Hier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 