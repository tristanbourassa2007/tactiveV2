'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Edit, Trash2, Plus, Users, UserCheck, Building, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Employee {
  id: number;
  fullName: string;
  initials: string;
  position: string;
  email: string;
  phone?: string;
  department: string;
  status: 'active' | 'inactive';
}

const employees: Employee[] = [
  {
    id: 1,
    fullName: "Dany Bourassa",
    initials: "DB",
    position: "Président",
    email: "dbourassa@bzinc.ca",
    phone: "",
    department: "Direction",
    status: "active"
  },
  {
    id: 2,
    fullName: "Francois Delisle",
    initials: "FD",
    position: "Vice-Président Technologie",
    email: "fdelisle@bzinc.ca",
    phone: "",
    department: "Technologie",
    status: "active"
  },
  {
    id: 3,
    fullName: "Yannick Moreau",
    initials: "YM",
    position: "Vice-Président Développement et Stratégie",
    email: "yannick.moreau@bzinc.ca",
    phone: "",
    department: "Développement",
    status: "active"
  },
  {
    id: 4,
    fullName: "Executif",
    initials: "EX",
    position: "Comité Exécutif",
    email: "",
    phone: "",
    department: "Direction",
    status: "active"
  },
  {
    id: 5,
    fullName: "Les gestionnaires",
    initials: "G",
    position: "Les gestionnaires",
    email: "",
    phone: "",
    department: "Gestion",
    status: "active"
  },
  {
    id: 6,
    fullName: "Melissa Pelletier",
    initials: "MP",
    position: "Directrice Administration et Finance",
    email: "melissa.pelletier@bzinc.ca",
    phone: "",
    department: "Finance",
    status: "active"
  },
  {
    id: 7,
    fullName: "RH",
    initials: "RH",
    position: "Ressource Humaine",
    email: "",
    phone: "",
    department: "RH",
    status: "active"
  },
  {
    id: 8,
    fullName: "Véronique Charest",
    initials: "VC",
    position: "Conseillère Ressource Humaine",
    email: "veronique.charest@bzinc.ca",
    phone: "",
    department: "RH",
    status: "active"
  },
  {
    id: 9,
    fullName: "Jérome Martel",
    initials: "JM",
    position: "Directeur Développement et Partenariat",
    email: "jerome.martel@bzinc.ca",
    phone: "",
    department: "Développement",
    status: "active"
  },
  {
    id: 10,
    fullName: "Eric Durand",
    initials: "ED",
    position: "Directeur adjoint programmation",
    email: "eric.durand@bzinc.ca",
    phone: "",
    department: "Programmation",
    status: "active"
  },
  {
    id: 11,
    fullName: "Richard Delisle",
    initials: "RD",
    position: "Directeur Infonuagique / Licences",
    email: "richard.delisle@bzinc.ca",
    phone: "",
    department: "Technologie",
    status: "active"
  },
  {
    id: 12,
    fullName: "Jean-Pierre Leclerc",
    initials: "JPL",
    position: "Directeur du service TI Infogérance",
    email: "jean-pierre.leclerc@bzinc.ca",
    phone: "",
    department: "TI",
    status: "active"
  },
  {
    id: 13,
    fullName: "Rosemarie Labrecque",
    initials: "RL",
    position: "Directrice Solutions d'affaire",
    email: "rosemarie.labrecque@bzinc.ca",
    phone: "",
    department: "Solutions",
    status: "active"
  },
  {
    id: 14,
    fullName: "Francis Marquis",
    initials: "FM",
    position: "Directeur adjoint solutions d'affaire",
    email: "francis.marquis@bzinc.ca",
    phone: "",
    department: "Solutions",
    status: "active"
  },
  {
    id: 15,
    fullName: "Eric Hains",
    initials: "EH",
    position: "Directeur adjoint et chargé de projet Solution d'affaire",
    email: "eric.hains@bzinc.ca",
    phone: "",
    department: "Solutions",
    status: "active"
  },
  {
    id: 16,
    fullName: "Emilie Quintal",
    initials: "EQ",
    position: "Directrice des recevables",
    email: "emilie.quintal@bzinc.ca",
    phone: "4189283898",
    department: "Finance",
    status: "active"
  },
  {
    id: 17,
    fullName: "Martin Carrier",
    initials: "MC",
    position: "Président BZ Telecom",
    email: "martin.carrier@bzinc.ca",
    phone: "4188021096",
    department: "Telecom",
    status: "active"
  },
  {
    id: 18,
    fullName: "Benoit Dorval",
    initials: "BD",
    position: "Directeur Cablage BZ Telecom",
    email: "benoit.dorval@bzinc.ca",
    phone: "",
    department: "Telecom",
    status: "active"
  },
  {
    id: 19,
    fullName: "Francois Bouchard",
    initials: "FB",
    position: "Président sortant BZ Telecom",
    email: "francois.bouchard@bzinc.ca",
    phone: "",
    department: "Telecom",
    status: "active"
  }
];

const departments = ['Tous', 'Direction', 'Technologie', 'Développement', 'Finance', 'RH', 'Programmation', 'TI', 'Solutions', 'Telecom', 'Gestion'];

export default function EquipePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Tous');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'Tous' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Statistiques
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const departmentCount = Array.from(new Set(employees.map(emp => emp.department))).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Équipe</h1>
              <p className="text-gray-600">Gestion des membres de l'équipe</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un membre
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employés</p>
                  <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Employés Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{activeEmployees}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Départements</p>
                  <p className="text-2xl font-bold text-purple-600">{departmentCount}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, poste ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des employés */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">
              Membres de l'équipe ({filteredEmployees.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nom complet</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Initiales</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Fonction</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Département</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Courriel</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Téléphone</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                            {employee.initials}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{employee.fullName}</div>
                            <div className="text-sm text-gray-500">
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                {employee.status === 'active' ? 'Actif' : 'Inactif'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {employee.initials}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {employee.position}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-purple-100 text-purple-800">
                          {employee.department}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {employee.email && (
                          <a href={`mailto:${employee.email}`} className="flex items-center text-blue-600 hover:text-blue-800">
                            <Mail className="h-4 w-4 mr-1" />
                            {employee.email}
                          </a>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {employee.phone && (
                          <a href={`tel:${employee.phone}`} className="flex items-center text-green-600 hover:text-green-800">
                            <Phone className="h-4 w-4 mr-1" />
                            {employee.phone}
                          </a>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Résumé par département */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.slice(1).map(dept => {
            const deptEmployees = employees.filter(emp => emp.department === dept);
            const deptColors = {
              'Direction': 'bg-red-100 text-red-800',
              'Technologie': 'bg-blue-100 text-blue-800',
              'Développement': 'bg-green-100 text-green-800',
              'Finance': 'bg-yellow-100 text-yellow-800',
              'RH': 'bg-purple-100 text-purple-800',
              'Programmation': 'bg-indigo-100 text-indigo-800',
              'TI': 'bg-cyan-100 text-cyan-800',
              'Solutions': 'bg-orange-100 text-orange-800',
              'Telecom': 'bg-pink-100 text-pink-800',
              'Gestion': 'bg-gray-100 text-gray-800'
            };

            return (
              <Card key={dept}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{dept}</h3>
                      <p className="text-sm text-gray-500">{deptEmployees.length} employé(s)</p>
                    </div>
                    <Badge className={deptColors[dept as keyof typeof deptColors] || 'bg-gray-100 text-gray-800'}>
                      {deptEmployees.length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 