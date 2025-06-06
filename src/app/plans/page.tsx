'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Calendar, Users, Target, TrendingUp, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState(mockPlans);
  
  // États pour le formulaire de nouveau plan
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    status: 'planning' as const,
    priority: 'medium' as const,
    startDate: '',
    endDate: '',
    budget: '',
    category: ''
  });

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: plans.length,
    active: plans.filter(p => p.status === 'active').length,
    completed: plans.filter(p => p.status === 'completed').length,
    totalBudget: plans.reduce((sum, p) => sum + p.budget, 0)
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form
    setNewPlan({
      title: '',
      description: '',
      status: 'planning',
      priority: 'medium',
      startDate: '',
      endDate: '',
      budget: '',
      category: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le nouveau plan
    const plan: Plan = {
      id: Math.max(...plans.map(p => p.id)) + 1,
      title: newPlan.title,
      description: newPlan.description,
      status: newPlan.status,
      priority: newPlan.priority,
      startDate: newPlan.startDate,
      endDate: newPlan.endDate,
      team: [], // Équipe vide par défaut
      progress: 0, // Progression à 0 par défaut
      budget: parseFloat(newPlan.budget) || 0,
      category: newPlan.category
    };

    // Ajouter le plan à la liste
    setPlans([...plans, plan]);
    
    // Fermer la modal
    handleCloseModal();
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
            
            <Button onClick={handleOpenModal}>
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

        {/* Modal Nouveau Plan */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={handleCloseModal}
              ></div>

              {/* Modal */}
              <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                {/* Header avec barre dégradée bleue */}
                <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-6 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Créer un nouveau plan</h3>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="px-6 py-8">
                  {/* Formulaire */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Titre */}
                      <div className="md:col-span-2">
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                          Titre du plan *
                        </Label>
                        <Input
                          id="title"
                          type="text"
                          required
                          value={newPlan.title}
                          onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                          placeholder="Ex: Plan de développement Q1"
                          className="w-full"
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </Label>
                        <textarea
                          id="description"
                          rows={3}
                          value={newPlan.description}
                          onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                          placeholder="Décrivez brièvement les objectifs de ce plan..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      {/* Statut */}
                      <div>
                        <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                          Statut
                        </Label>
                        <select
                          id="status"
                          value={newPlan.status}
                          onChange={(e) => setNewPlan({...newPlan, status: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="planning">Planification</option>
                          <option value="active">Actif</option>
                          <option value="paused">En pause</option>
                          <option value="completed">Complété</option>
                        </select>
                      </div>

                      {/* Priorité */}
                      <div>
                        <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                          Priorité
                        </Label>
                        <select
                          id="priority"
                          value={newPlan.priority}
                          onChange={(e) => setNewPlan({...newPlan, priority: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Basse</option>
                          <option value="medium">Moyenne</option>
                          <option value="high">Haute</option>
                        </select>
                      </div>

                      {/* Date début */}
                      <div>
                        <Label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Date de début *
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          required
                          value={newPlan.startDate}
                          onChange={(e) => setNewPlan({...newPlan, startDate: e.target.value})}
                          className="w-full"
                        />
                      </div>

                      {/* Date fin */}
                      <div>
                        <Label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Date de fin *
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          required
                          value={newPlan.endDate}
                          onChange={(e) => setNewPlan({...newPlan, endDate: e.target.value})}
                          className="w-full"
                        />
                      </div>

                      {/* Budget */}
                      <div>
                        <Label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                          Budget (CAD)
                        </Label>
                        <Input
                          id="budget"
                          type="number"
                          min="0"
                          step="100"
                          value={newPlan.budget}
                          onChange={(e) => setNewPlan({...newPlan, budget: e.target.value})}
                          placeholder="Ex: 50000"
                          className="w-full"
                        />
                      </div>

                      {/* Catégorie */}
                      <div>
                        <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                          Catégorie
                        </Label>
                        <Input
                          id="category"
                          type="text"
                          value={newPlan.category}
                          onChange={(e) => setNewPlan({...newPlan, category: e.target.value})}
                          placeholder="Ex: Développement, Marketing..."
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end space-x-3 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCloseModal}
                      >
                        Annuler
                      </Button>
                      <Button type="submit">
                        Créer le plan
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 