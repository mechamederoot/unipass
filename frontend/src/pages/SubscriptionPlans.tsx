import React, { useState, useEffect } from 'react';
import { Check, Star, Zap, Shield, Crown, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface Plan {
  id: number;
  name: string;
  description: string;
  plan_type: 'basic' | 'premium' | 'unlimited';
  price_monthly: number;
  price_yearly: number | null;
  max_checkins_per_month: number | null;
  max_gyms_access: number | null;
  features: string[];
  savings_yearly: number;
}

interface CurrentSubscription {
  id: number;
  plan: {
    id: number;
    name: string;
    plan_type: string;
  };
  status: string;
  start_date: string;
  end_date: string;
  is_yearly: boolean;
  auto_renew: boolean;
  checkins_used_this_month: number;
  checkins_limit: number | null;
  days_remaining: number;
  next_billing_date: string;
}

const SubscriptionPlans: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    loadPlansAndSubscription();
  }, [isAuthenticated]);

  const loadPlansAndSubscription = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadPlans(),
        isAuthenticated ? loadCurrentSubscription() : Promise.resolve()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlans = async () => {
    // Mock data - replace with actual API call
    const mockPlans: Plan[] = [
      {
        id: 1,
        name: "Básico",
        description: "Perfeito para começar sua jornada fitness",
        plan_type: "basic",
        price_monthly: 29.90,
        price_yearly: 299.00,
        max_checkins_per_month: 8,
        max_gyms_access: 50,
        features: [
          "8 check-ins por mês",
          "Acesso a 50+ academias",
          "App mobile",
          "Suporte básico"
        ],
        savings_yearly: 59.80
      },
      {
        id: 2,
        name: "Premium",
        description: "Ideal para quem treina regularmente",
        plan_type: "premium",
        price_monthly: 49.90,
        price_yearly: 499.00,
        max_checkins_per_month: 20,
        max_gyms_access: 200,
        features: [
          "20 check-ins por mês",
          "Acesso a 200+ academias",
          "Reserva de equipamentos",
          "Suporte prioritário",
          "Relatórios avançados"
        ],
        savings_yearly: 99.80
      },
      {
        id: 3,
        name: "Ilimitado",
        description: "Liberdade total para treinar",
        plan_type: "unlimited",
        price_monthly: 79.90,
        price_yearly: 799.00,
        max_checkins_per_month: null,
        max_gyms_access: null,
        features: [
          "Check-ins ilimitados",
          "Acesso a todas as academias",
          "Reserva prioritária",
          "Suporte VIP 24/7",
          "Análises personalizadas",
          "Descontos em produtos"
        ],
        savings_yearly: 159.80
      }
    ];
    setPlans(mockPlans);
  };

  const loadCurrentSubscription = async () => {
    // Mock data - replace with actual API call
    const mockSubscription: CurrentSubscription = {
      id: 1,
      plan: {
        id: 2,
        name: "Premium",
        plan_type: "premium"
      },
      status: "active",
      start_date: "2024-07-01T00:00:00Z",
      end_date: "2024-08-01T00:00:00Z",
      is_yearly: false,
      auto_renew: true,
      checkins_used_this_month: 12,
      checkins_limit: 20,
      days_remaining: 15,
      next_billing_date: "2024-08-01T00:00:00Z"
    };
    setCurrentSubscription(mockSubscription);
  };

  const handleSubscribe = async (planId: number) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    setIsSubscribing(true);
    setSelectedPlan(planId);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reload subscription data
      await loadCurrentSubscription();
      
      alert('Assinatura realizada com sucesso!');
    } catch (error) {
      alert('Erro ao processar assinatura. Tente novamente.');
    } finally {
      setIsSubscribing(false);
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Tem certeza que deseja cancelar sua assinatura?')) {
      return;
    }

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentSubscription(null);
      alert('Assinatura cancelada com sucesso. Você manterá o acesso até o final do período pago.');
    } catch (error) {
      alert('Erro ao cancelar assinatura. Tente novamente.');
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'basic':
        return <Star className="h-8 w-8" />;
      case 'premium':
        return <Zap className="h-8 w-8" />;
      case 'unlimited':
        return <Crown className="h-8 w-8" />;
      default:
        return <Shield className="h-8 w-8" />;
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'basic':
        return 'from-blue-500 to-blue-600';
      case 'premium':
        return 'from-purple-500 to-purple-600';
      case 'unlimited':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (isLoading) {
    return <LoadingSpinner message="Carregando planos..." />;
  }

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Encontre o plano perfeito para sua rotina de exercícios
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Anual
                <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Economize até 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <div className="card mb-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Sua Assinatura Atual</h3>
                <p className="text-primary-100 mb-4">
                  Plano {currentSubscription.plan.name} • {currentSubscription.days_remaining} dias restantes
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div>
                    <span className="text-primary-200">Check-ins usados:</span>
                    <span className="ml-1 font-medium">
                      {currentSubscription.checkins_used_this_month}
                      {currentSubscription.checkins_limit && ` / ${currentSubscription.checkins_limit}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-primary-200">Próxima cobrança:</span>
                    <span className="ml-1 font-medium">
                      {new Date(currentSubscription.next_billing_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors">
                  Gerenciar
                </button>
                <button 
                  onClick={handleCancelSubscription}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrentPlan = currentSubscription?.plan.id === plan.id;
            const price = billingCycle === 'yearly' && plan.price_yearly 
              ? plan.price_yearly / 12 
              : plan.price_monthly;
            const originalYearlyPrice = plan.price_monthly * 12;
            const savings = billingCycle === 'yearly' && plan.price_yearly 
              ? originalYearlyPrice - plan.price_yearly 
              : 0;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  plan.plan_type === 'premium' ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {plan.plan_type === 'premium' && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-b-lg text-sm font-medium">
                    Mais Popular
                  </div>
                )}

                <div className={`bg-gradient-to-r ${getPlanColor(plan.plan_type)} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    {getPlanIcon(plan.plan_type)}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                  <p className="text-center opacity-90">{plan.description}</p>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(price)}
                      </span>
                      <span className="text-gray-600 ml-1">/mês</span>
                    </div>
                    
                    {billingCycle === 'yearly' && plan.price_yearly && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(plan.price_monthly)}
                        </span>
                        <span className="ml-2 text-sm text-green-600 font-medium">
                          Economize {formatPrice(savings)}/ano
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCurrentPlan || (isSubscribing && selectedPlan === plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                      isCurrentPlan
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : plan.plan_type === 'premium'
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {isCurrentPlan ? (
                      'Plano Atual'
                    ) : isSubscribing && selectedPlan === plan.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processando...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="inline h-5 w-5 mr-2" />
                        Assinar Agora
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso cancelar a qualquer momento?
                </h3>
                <p className="text-gray-600">
                  Sim, você pode cancelar sua assinatura a qualquer momento. Você manterá o acesso até o final do período pago.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Como funciona o limite de check-ins?
                </h3>
                <p className="text-gray-600">
                  O limite é renovado todo mês. Check-ins não utilizados não acumulam para o próximo mês.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Posso mudar de plano?
                </h3>
                <p className="text-gray-600">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento com ajuste proporcional.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Há taxa de cancelamento?
                </h3>
                <p className="text-gray-600">
                  Não cobramos nenhuma taxa de cancelamento. Sem pegadinhas ou taxas ocultas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
