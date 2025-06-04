'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Download, Filter, Calendar, Eye, Clock, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FinancialData {
  id: number;
  category: string;
  amount: number;
  type: 'revenue' | 'expense';
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
}

// Données pour BZ inc.
const bzIncData: FinancialData[] = [
  {
    id: 1,
    category: "Développement Produit",
    amount: 125000,
    type: "expense",
    date: "2024-01-15",
    description: "Coûts de développement Q1",
    status: "completed"
  },
  {
    id: 2,
    category: "Ventes Licences",
    amount: 280000,
    type: "revenue",
    date: "2024-01-20",
    description: "Revenus licences logicielles",
    status: "completed"
  },
  {
    id: 3,
    category: "Marketing Digital",
    amount: 45000,
    type: "expense",
    date: "2024-01-25",
    description: "Campagne publicitaire Q1",
    status: "completed"
  }
];

// Données pour BZ Telecom inc.
const bzTelecomData: FinancialData[] = [
  {
    id: 1,
    category: "Infrastructure Réseau",
    amount: 200000,
    type: "expense",
    date: "2024-01-10",
    description: "Équipements télécommunications",
    status: "completed"
  },
  {
    id: 2,
    category: "Services Télécom",
    amount: 450000,
    type: "revenue",
    date: "2024-01-15",
    description: "Revenus services clients",
    status: "completed"
  },
  {
    id: 3,
    category: "Maintenance",
    amount: 75000,
    type: "expense",
    date: "2024-01-20",
    description: "Maintenance réseau mensuelle",
    status: "completed"
  }
];

// Données pour Gestion KiloOctets inc.
const kiloOctetsData: FinancialData[] = [
  {
    id: 1,
    category: "Serveurs Cloud",
    amount: 180000,
    type: "expense",
    date: "2024-01-05",
    description: "Infrastructure cloud computing",
    status: "completed"
  },
  {
    id: 2,
    category: "Services IT",
    amount: 320000,
    type: "revenue",
    date: "2024-01-12",
    description: "Consultations IT entreprises",
    status: "completed"
  },
  {
    id: 3,
    category: "Licences Logicielles",
    amount: 95000,
    type: "expense",
    date: "2024-01-18",
    description: "Licences développement",
    status: "completed"
  }
];

const companies = [
  { id: 'bz-inc', name: 'BZ inc.', data: bzIncData },
  { id: 'bz-telecom', name: 'BZ Telecom inc.', data: bzTelecomData },
  { id: 'kilooctets', name: 'Gestion KiloOctets inc.', data: kiloOctetsData }
];

export default function RapportsFinanciersPage() {
  const [filterType, setFilterType] = useState<'all' | 'revenue' | 'expense'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCompany, setSelectedCompany] = useState('kilooctets');
  const [selectedReportsCompany, setSelectedReportsCompany] = useState('kilooctets');

  const currentCompanyData = companies.find(c => c.id === selectedCompany)?.data || kiloOctetsData;
  
  const filteredData = currentCompanyData.filter(item => 
    filterType === 'all' || item.type === filterType
  );

  // Calculs des statistiques
  const totalRevenue = currentCompanyData
    .filter(item => item.type === 'revenue' && item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = currentCompanyData
    .filter(item => item.type === 'expense' && item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);

  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const pendingRevenue = currentCompanyData
    .filter(item => item.type === 'revenue' && item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapports Financiers</h1>
              <p className="text-gray-600">Vue d'ensemble de la performance financière</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Période
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalRevenue.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">+12.5% vs mois dernier</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dépenses Total</p>
                  <p className="text-2xl font-bold text-red-600">
                    {totalExpenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">+8.3% vs mois dernier</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profit Net</p>
                  <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netProfit.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Marge: {profitMargin.toFixed(1)}%
                  </p>
                </div>
                <div className={`p-3 rounded-full ${netProfit >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                  <DollarSign className={`h-6 w-6 ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Attente</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {pendingRevenue.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Revenus à recevoir</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques et tableaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Répartition par catégorie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Répartition par Catégorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simulation d'un graphique en barres */}
                <div className="space-y-3">
                  {['Développement', 'Marketing', 'Infrastructure', 'Consultations'].map((category, index) => {
                    const values = [45, 25, 20, 35];
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
                    return (
                      <div key={category} className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">{category}</div>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${colors[index]}`}
                              style={{width: `${values[index]}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900 w-12">
                          {values[index]}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Évolution mensuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Évolution Mensuelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simulation d'un graphique linéaire */}
                <div className="h-48 flex items-end justify-between border-l border-b border-gray-200 pl-4 pb-4">
                  {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map((month, index) => {
                    const heights = [60, 80, 45, 90, 70, 85];
                    return (
                      <div key={month} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t mb-2"
                          style={{height: `${heights[index]}%`}}
                        ></div>
                        <span className="text-xs text-gray-500">{month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Revenus</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                    <span>Dépenses</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et tableau des transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Détail des Transactions</CardTitle>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">Toutes les transactions</option>
                  <option value="revenue">Revenus seulement</option>
                  <option value="expense">Dépenses seulement</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Catégorie</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Montant</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Statut</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">
                        {new Date(item.date).toLocaleDateString('fr-CA')}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {item.description}
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            item.type === 'revenue' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {item.type === 'revenue' ? 'Revenu' : 'Dépense'}
                        </Badge>
                      </td>
                      <td className={`py-3 px-4 text-sm font-bold text-right ${
                        item.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.type === 'revenue' ? '+' : '-'}
                        {item.amount.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge 
                          className={
                            item.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {item.status === 'completed' ? 'Complété' : 
                           item.status === 'pending' ? 'En attente' : 'Annulé'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Sections Rapports et Configuration */}
        <div className="space-y-8 mt-12">
          {/* Section Rapports financiers */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Rapports financiers</CardTitle>
                <div className="relative">
                  <select
                    value={selectedReportsCompany}
                    onChange={(e) => setSelectedReportsCompany(e.target.value)}
                    className="appearance-none bg-white/10 text-white border border-white/20 rounded px-4 py-2 pr-8 focus:outline-none focus:bg-white/20 cursor-pointer"
                  >
                    {companies.map((company) => (
                      <option key={company.id} value={company.id} className="text-gray-900">
                        {company.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Colonne de gauche */}
                <div className="space-y-0">
                  {[
                    { name: "Aperçu de l'entreprise", favorite: false },
                    { name: "États des résultats par mois comparatifs détaillés", favorite: true },
                    { name: "États des résultats", favorite: false },
                    { name: "Rapport des ventes par secteur d'affaires", favorite: true },
                    { name: "États des résultats par secteur d'affaire avec profits et pertes", favorite: false },
                    { name: "États des résultats par mois comparatifs détaillés sous groupes", favorite: true },
                    { name: "à venir", favorite: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="flex items-center">
                        {item.favorite ? (
                          <span className="text-green-500">★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Colonne de droite */}
                <div className="space-y-0">
                  {[
                    { name: "Liste des Amortissements", favorite: true },
                    { name: "Amortissements Exportation mensuel GL", favorite: true },
                    { name: "États financiers détaillés mensuel FD", favorite: true },
                    { name: "États financiers mensuel FD", favorite: true },
                    { name: "Bilan sommaire", favorite: false },
                    { name: "% du total des revenus de l'état des résultats", favorite: false },
                    { name: "à venir", favorite: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="flex items-center">
                        {item.favorite ? (
                          <span className="text-green-500">★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Configuration */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Configuration</CardTitle>
                <div className="relative">
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="appearance-none bg-white/10 text-white border border-white/20 rounded px-4 py-2 pr-8 focus:outline-none focus:bg-white/20 cursor-pointer"
                  >
                    {companies.map((company) => (
                      <option key={company.id} value={company.id} className="text-gray-900">
                        {company.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Colonne de gauche */}
                <div className="space-y-0">
                  {[
                    { name: "Liste des comptes", favorite: true, color: "blue" },
                    { name: "Gestion des compagnies", favorite: true, color: "blue" },
                    { name: "Gestion des types de comptes", favorite: true, color: "red" },
                    { name: "Gestion des sous-types de compte", favorite: true, color: "blue" },
                    { name: "Gestion des groupes des états financiers", favorite: true, color: "blue" },
                    { name: "Gestion des budgets annuels", favorite: true, color: "blue" },
                    { name: "Gestion des départements", favorite: true, color: "blue" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="flex items-center">
                        {item.favorite ? (
                          <span className={`${
                            item.color === "red" ? "text-red-500" :
                            item.color === "blue" ? "text-blue-500" :
                            item.color === "green" ? "text-green-500" :
                            "text-gray-300"
                          }`}>★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Colonne de droite */}
                <div className="space-y-0">
                  {[
                    { name: "Importation des inscriptions GL mensuel", favorite: true, color: "green" },
                    { name: "Gestion des secteurs d'affaire", favorite: true, color: "red" },
                    { name: "Liste des incriptions du Grand Livre", favorite: false, color: "gray" },
                    { name: "Liste des Notes des GL", favorite: true, color: "blue" },
                    { name: "États financiers des comptables annuels PDF", favorite: true, color: "red" },
                    { name: "Email fin de mois GPT4o-mini AI", favorite: true, color: "green" },
                    { name: "Gestion des sous-groupes de compte", favorite: true, color: "blue" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="flex items-center">
                        {item.favorite ? (
                          <span className={`${
                            item.color === "red" ? "text-red-500" :
                            item.color === "blue" ? "text-blue-500" :
                            item.color === "green" ? "text-green-500" :
                            "text-gray-300"
                          }`}>★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 