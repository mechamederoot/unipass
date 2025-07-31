import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, CreditCard, TrendingUp, AlertTriangle, 
  Search, Filter, Plus, Settings, Eye, Ban, CheckCircle,
  DollarSign, Activity
} from 'lucide-react';
import { BarChart } from '../components/Charts';
import LoadingSpinner from '../components/LoadingSpinner';

interface AdminStats {
  total_users: number;
  total_gyms: number;
  active_subscriptions: number;
  today_checkins: number;
  new_users_week: number;
  month_revenue: number;
  open_tickets: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  subscription: {
    plan_name: string | null;
    status: string | null;
    end_date: string | null;
  };
  total_checkins: number;
}

interface GymAdmin {
  id: number;
  name: string;
  address: string;
  phone: string;
  current_occupancy: number;
  max_capacity: number;
  occupancy_percentage: number;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  created_at: string;
  total_checkins: number;
  month_checkins: number;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [gyms, setGyms] = useState<GymAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [, ] = useState(1);

  useEffect(() => {
    loadAdminData();
  }, [activeTab]);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'dashboard') {
        await loadDashboardStats();
      } else if (activeTab === 'users') {
        await loadUsers();
      } else if (activeTab === 'gyms') {
        await loadGyms();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    // Mock data - replace with actual API call
    const mockStats: AdminStats = {
      total_users: 1247,
      total_gyms: 89,
      active_subscriptions: 892,
      today_checkins: 3456,
      new_users_week: 67,
      month_revenue: 45678.90,
      open_tickets: 12
    };
    setStats(mockStats);
  };

  const loadUsers = async () => {
    // Mock data - replace with actual API call
    const mockUsers: User[] = [
      {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        is_active: true,
        created_at: "2024-01-15T10:30:00Z",
        subscription: {
          plan_name: "Premium",
          status: "active",
          end_date: "2024-08-15T23:59:59Z"
        },
        total_checkins: 47
      },
      {
        id: 2,
        name: "Maria Santos",
        email: "maria@email.com",
        phone: "(11) 88888-8888",
        is_active: true,
        created_at: "2024-02-20T14:15:00Z",
        subscription: {
          plan_name: "Básico",
          status: "active",
          end_date: "2024-09-20T23:59:59Z"
        },
        total_checkins: 23
      },
      {
        id: 3,
        name: "Pedro Costa",
        email: "pedro@email.com",
        phone: "(11) 77777-7777",
        is_active: false,
        created_at: "2024-03-10T09:45:00Z",
        subscription: {
          plan_name: null,
          status: null,
          end_date: null
        },
        total_checkins: 8
      }
    ];
    setUsers(mockUsers);
  };

  const loadGyms = async () => {
    // Mock data - replace with actual API call
    const mockGyms: GymAdmin[] = [
      {
        id: 1,
        name: "Smart Fit Centro",
        address: "Rua das Flores, 123 - Centro",
        phone: "(11) 3333-4444",
        current_occupancy: 45,
        max_capacity: 80,
        occupancy_percentage: 56.25,
        rating: 4.5,
        total_reviews: 234,
        is_active: true,
        created_at: "2023-06-01T00:00:00Z",
        total_checkins: 12456,
        month_checkins: 1234
      },
      {
        id: 2,
        name: "Academia Forma",
        address: "Av. Paulista, 456 - Bela Vista",
        phone: "(11) 2222-3333",
        current_occupancy: 20,
        max_capacity: 60,
        occupancy_percentage: 33.33,
        rating: 4.2,
        total_reviews: 189,
        is_active: true,
        created_at: "2023-08-15T00:00:00Z",
        total_checkins: 8901,
        month_checkins: 890
      }
    ];
    setGyms(mockGyms);
  };

  const handleToggleUserStatus = async (userId: number) => {
    // Mock API call - replace with actual implementation
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, is_active: !user.is_active }
        : user
    ));
  };

  const handleToggleGymStatus = async (gymId: number) => {
    // Mock API call - replace with actual implementation
    setGyms(prev => prev.map(gym => 
      gym.id === gymId 
        ? { ...gym, is_active: !gym.is_active }
        : gym
    ));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isLoading && !stats && users.length === 0 && gyms.length === 0) {
    return <LoadingSpinner message="Carregando painel administrativo..." />;
  }

  return (
    <div className="min-h-screen-safe bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-sm text-gray-600">Gestão completa do sistema Unipass</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-primary">
                <Plus size={20} className="mr-2" />
                Novo
              </button>
              <button className="btn-secondary">
                <Settings size={20} className="mr-2" />
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
              { id: 'users', name: 'Usuários', icon: Users },
              { id: 'gyms', name: 'Academias', icon: Building2 },
              { id: 'subscriptions', name: 'Assinaturas', icon: CreditCard },
              { id: 'support', name: 'Suporte', icon: AlertTriangle },
              { id: 'analytics', name: 'Analytics', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon size={20} className="mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Usuários</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_users.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-600 p-3 rounded-lg mr-4">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Academias Ativas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_gyms}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg mr-4">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assinaturas Ativas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.active_subscriptions.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg mr-4">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.month_revenue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <Activity className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.today_checkins.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Check-ins Hoje</p>
              </div>

              <div className="card text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.new_users_week}</p>
                <p className="text-sm text-gray-600">Novos Usuários (7 dias)</p>
              </div>

              <div className="card text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.open_tickets}</p>
                <p className="text-sm text-gray-600">Tickets em Aberto</p>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Check-ins por Dia</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <p>Gráfico de check-ins diários</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Novos Usuários</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <p>Gráfico de crescimento de usuários</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="btn-secondary">
                    <Filter size={20} className="mr-2" />
                    Filtros
                  </button>
                </div>
                <button className="btn-primary">
                  <Plus size={20} className="mr-2" />
                  Novo Usuário
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assinatura
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-ins
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">{user.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.subscription.plan_name ? (
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.subscription.plan_name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Até {formatDate(user.subscription.end_date!)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Sem assinatura</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.total_checkins}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.is_active 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={user.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                          >
                            {user.is_active ? <Ban size={16} /> : <CheckCircle size={16} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gyms' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar academias..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="btn-secondary">
                    <Filter size={20} className="mr-2" />
                    Filtros
                  </button>
                </div>
                <button className="btn-primary">
                  <Plus size={20} className="mr-2" />
                  Nova Academia
                </button>
              </div>
            </div>

            {/* Gyms Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Academia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ocupação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avaliação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-ins
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {gyms.map((gym) => (
                      <tr key={gym.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{gym.name}</div>
                            <div className="text-sm text-gray-500">{gym.address}</div>
                            <div className="text-xs text-gray-400">{gym.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {gym.current_occupancy}/{gym.max_capacity}
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${Math.min(gym.occupancy_percentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              ⭐ {gym.rating.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {gym.total_reviews} avaliações
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {gym.total_checkins.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {gym.month_checkins} este mês
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            gym.is_active 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {gym.is_active ? 'Ativa' : 'Inativa'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleToggleGymStatus(gym.id)}
                            className={gym.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                          >
                            {gym.is_active ? <Ban size={16} /> : <CheckCircle size={16} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content placeholder */}
        {!['dashboard', 'users', 'gyms'].includes(activeTab) && (
          <div className="card">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-gray-600">Esta seção está em desenvolvimento.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
