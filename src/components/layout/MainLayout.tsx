'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, PieChart, ChevronDown, Menu, X, LogOut } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isPlansOpen, setIsPlansOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 flex-col fixed h-full pro-sidebar z-30">
        {/* Logo and Welcome section */}
        <div className="bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="relative">
              <span className="text-4xl font-light tracking-tight">b</span>
              <span className="text-4xl font-light absolute -right-3 top-0 transform -rotate-12 transition-all duration-300 hover:rotate-0">z</span>
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Bienvenue sur TactiCE</h1>
            <p className="text-blue-100 text-sm">
              Votre plateforme de gestion intégrée pour piloter vos projets
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm text-blue-100">Plans actifs</div>
              <div className="text-xl font-bold">24</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm text-blue-100">Jalons</div>
              <div className="text-xl font-bold">8</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="space-y-2">
            <Link 
              href="/" 
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
            >
              <Home className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-600" />
              <span className="font-medium">Accueil</span>
            </Link>
            
            <div>
              <button
                onClick={() => setIsPlansOpen(!isPlansOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-600" />
                  <span className="font-medium">Plans</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isPlansOpen ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`mt-2 ml-12 space-y-1 transition-all duration-200 ease-in-out ${
                  isPlansOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
              >
                {[
                  { href: "/plans/liste", label: "Liste des plans" },
                  { href: "/plans/jalons", label: "Liste des jalons" },
                  { href: "/plans/contacts", label: "Liste des contacts" },
                  { href: "/plans/strategies", label: "Liste des stratégies" }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/rapports" 
              className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
            >
              <PieChart className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-600" />
              <span className="font-medium">Rapports financiers</span>
            </Link>
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-medium">
                DB
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Dany Bourassa</p>
                <p className="text-xs text-gray-500 truncate">dbourassa@bz-inc.ca</p>
              </div>
              <LogOut className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-gray-900 transition-colors shadow-sm"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar - Mobile */}
      <aside 
        className={`lg:hidden fixed inset-0 bg-white z-20 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile sidebar content - same as desktop but with different styling */}
      </aside>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <header className="h-16 pro-header fixed top-0 right-0 left-0 lg:left-80 z-10">
          <div className="h-full px-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Accueil
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  );
} 