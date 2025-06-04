'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Calendar, Users, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Plan {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'paused';
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  endDate: string;
  team: string[];
  progress: number;
  budget: number;
  category: string;
}

const mockPlans: Plan[] = [
  {
    id: 1,
    title: "Plan de développement produit Q1",
    description: "Développement des nouvelles fonctionnalités pour la plateforme",
    status: "active",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-03-31",
    team: ["Alice", "Bob", "Charlie"],
    progress: 65,
    budget: 50000,
    category: "Développement"
  },
  {
    id: 2,
    title: "Stratégie marketing digital",
    description: "Campagne de marketing pour augmenter la visibilité",
    status: "planning",
    priority: "medium",
    startDate: "2024-02-01",
    endDate: "2024-05-30",
    team: ["Diana", "Eve"],
    progress: 25,
    budget: 30000,
    category: "Marketing"
  },
  {
    id: 3,
    title: "Optimisation infrastructure",
    description: "Amélioration des performances et de la sécurité",
    status: "active",
    priority: "high",
    startDate: "2024-01-01",
    endDate: "2024-04-15",
    team: ["Frank", "Grace", "Henry", "Ivy"],
    progress: 80,
    budget: 75000,
    category: "Infrastructure"
  },
  {
    id: 4,
    title: "Formation équipe",
    description: "Programme de formation continue pour l'équipe",
    status: "completed",
    priority: "medium",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    team: ["Jack", "Kate"],
    progress: 100,
    budget: 15000,
    category: "Formation"
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  planning: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
  paused: "bg-yellow-100 text-yellow-800"
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-orange-100 text-orange-800",
  low: "bg-green-100 text-green-800"
};

export default function PlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockPlans.length,
    active: mockPlans.filter(p => p.status === 'active').length,
    completed: mockPlans.filter(p => p.status === 'completed').length,
    totalBudget: mockPlans.reduce((sum, p) => sum + p.budget, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plans de Projet</h1>
          <p className="text-gray-600">Gérez et suivez tous vos plans stratégiques</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Plans</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plans Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Complétés</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget Total</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.totalBudget.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'outils */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="planning">Planification</option>
              <option value="completed">Complété</option>
              <option value="paused">En pause</option>
            </select>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Plan
            </Button>
          </div>
        </div>

        {/* Liste des plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{plan.title}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  </div>
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex gap-2">
                  <Badge className={statusColors[plan.status]}>
                    {plan.status === 'active' ? 'Actif' :
                     plan.status === 'planning' ? 'Planification' :
                     plan.status === 'completed' ? 'Complété' : 'En pause'}
                  </Badge>
                  <Badge className={priorityColors[plan.priority]}>
                    {plan.priority === 'high' ? 'Haute' :
                     plan.priority === 'medium' ? 'Moyenne' : 'Basse'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {/* Progression */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${plan.progress}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* Équipe */}
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{plan.team.length} membres</span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(plan.startDate).toLocaleDateString('fr-CA')} - {new Date(plan.endDate).toLocaleDateString('fr-CA')}</span>
                  </div>

                  {/* Budget */}
                  <div className="text-sm">
                    <span className="text-gray-600">Budget: </span>
                    <span className="font-medium text-green-600">
                      {plan.budget.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                    </span>
                  </div>

                  {/* Catégorie */}
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {plan.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun plan trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
} 