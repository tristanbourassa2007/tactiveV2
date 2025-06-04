'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Tableau de bord', href: '/', icon: '🏠' },
    { name: 'Projets', href: '/projets', icon: '📁' },
    { name: 'Équipe', href: '/equipe', icon: '👥' },
    { name: 'Rapports', href: '/rapports', icon: '📊' },
    { name: 'Paramètres', href: '/parametres', icon: '⚙️' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 text-white h-screen fixed left-0 top-0 z-50`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>TactiCE</h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`${!isOpen && 'hidden'} group-hover:text-blue-400 transition-colors`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
            U
          </div>
          <div className={`${!isOpen && 'hidden'}`}>
            <p className="text-sm font-medium">Utilisateur</p>
            <p className="text-xs text-slate-400">En ligne</p>
          </div>
        </div>
      </div>
    </div>
  );
} 