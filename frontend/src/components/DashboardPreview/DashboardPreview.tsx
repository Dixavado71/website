import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, MessageSquare, ShoppingCart, Activity } from 'lucide-react';
import { SectionTitle } from '../UI/SectionTitle';
import { GlassCard } from '../UI/GlassCard';
import { dashboardMetrics, salesChartData, recentOrders, activeConversations } from '../../data/dashboard';

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-purple/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="Dashboard Completo"
          title="Controle sua operação em um só lugar"
          subtitle="Acompanhe métricas, gerencie pedidos e visualize todo o seu negócio em tempo real."
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dashboardMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard glow={idx === 0 ? 'green' : 'none'} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">{metric.label}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    idx === 0 ? 'bg-primary/10' :
                    idx === 1 ? 'bg-cyan/10' :
                    idx === 2 ? 'bg-purple/10' :
                    'bg-magenta/10'
                  }`}>
                    {idx === 0 ? <TrendingUp size={16} className="text-primary" /> :
                     idx === 1 ? <ShoppingCart size={16} className="text-cyan" /> :
                     idx === 2 ? <Users size={16} className="text-purple" /> :
                     <MessageSquare size={16} className="text-magenta" />}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
                <div className={`text-sm font-medium ${metric.positive ? 'text-primary' : 'text-red-500'}`}>
                  {metric.change} vs mês anterior
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard glow="cyan" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Vendas da Semana</h3>
                <BarChart3 size={20} className="text-cyan" />
              </div>
              
              {/* Simple Line Chart Visualization */}
              <div className="relative h-48">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Area fill */}
                  <path
                    d={`M0,200 L0,${200 - salesChartData[0].value * 2} L57,${200 - salesChartData[1].value * 2} L114,${200 - salesChartData[2].value * 2} L171,${200 - salesChartData[3].value * 2} L228,${200 - salesChartData[4].value * 2} L285,${200 - salesChartData[5].value * 2} L342,${200 - salesChartData[6].value * 2} L400,${200 - salesChartData[6].value * 2} L400,200 Z`}
                    fill="rgba(0, 229, 255, 0.1)"
                  />
                  
                  {/* Line */}
                  <polyline
                    points={salesChartData.map((point, idx) => 
                      `${idx * 57},${200 - point.value * 2}`
                    ).join(' ')}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2"
                  />
                  
                  {/* Points */}
                  {salesChartData.map((point, idx) => (
                    <circle
                      key={idx}
                      cx={idx * 57}
                      cy={200 - point.value * 2}
                      r="4"
                      fill="#00E5FF"
                      className="hover:r-6 transition-all"
                    />
                  ))}
                </svg>
                
                {/* X-axis labels */}
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  {salesChartData.map((point, idx) => (
                    <span key={idx}>{point.label}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard glow="purple" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Pedidos Recentes</h3>
                <Activity size={20} className="text-purple" />
              </div>
              
              <div className="space-y-4">
                {recentOrders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-surfaceAlt/30 rounded-lg border border-white/5 hover:border-purple/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center">
                        <ShoppingCart size={16} className="text-purple" />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{order.customer}</div>
                        <div className="text-xs text-gray-400">{order.product}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white text-sm">{order.value}</div>
                      <div className={`text-xs ${
                        order.status === 'completed' ? 'text-primary' :
                        order.status === 'processing' ? 'text-cyan' :
                        order.status === 'pending' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {order.status === 'completed' ? 'Concluído' :
                         order.status === 'processing' ? 'Processando' :
                         order.status === 'pending' ? 'Pendente' :
                         'Cancelado'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Active Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard glow="magenta" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Conversas Ativas</h3>
              <MessageSquare size={20} className="text-magenta" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {activeConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 bg-surfaceAlt/30 rounded-lg border border-white/5 hover:border-magenta/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-white text-sm">{conversation.customer}</div>
                    {conversation.unread > 0 && (
                      <span className="px-2 py-0.5 bg-magenta text-black text-xs font-bold rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2 truncate">{conversation.lastMessage}</p>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
