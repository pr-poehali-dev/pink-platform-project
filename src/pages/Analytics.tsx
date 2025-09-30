import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { date: "01.09", sales: 12500, orders: 8 },
  { date: "05.09", sales: 18900, orders: 12 },
  { date: "10.09", sales: 15200, orders: 10 },
  { date: "15.09", sales: 22400, orders: 15 },
  { date: "20.09", sales: 28100, orders: 18 },
  { date: "25.09", sales: 31500, orders: 21 },
  { date: "30.09", sales: 35800, orders: 24 },
];

const categoryData = [
  { name: "Женская одежда", value: 45, color: "#E91E63" },
  { name: "Мужская одежда", value: 30, color: "#F06292" },
  { name: "Обувь", value: 15, color: "#FCE4EC" },
  { name: "Аксессуары", value: 10, color: "#C2185B" },
];

const topProducts = [
  { name: "Платье летнее", sales: 45, revenue: 134550 },
  { name: "Джинсы классические", sales: 38, revenue: 133000 },
  { name: "Кроссовки спортивные", sales: 32, revenue: 159680 },
  { name: "Футболка базовая", sales: 28, revenue: 41720 },
  { name: "Куртка демисезонная", sales: 22, revenue: 175780 },
];

const Analytics = () => {
  const [period, setPeriod] = useState("month");

  const totalRevenue = 644730;
  const totalOrders = 165;
  const avgCheck = Math.round(totalRevenue / totalOrders);
  const conversionRate = 3.2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm text-pink-600 mb-2">Аналитика</div>
            <h1 className="text-4xl font-bold text-pink-900">Статистика продаж</h1>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48 border-pink-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Последняя неделя</SelectItem>
              <SelectItem value="month">Последний месяц</SelectItem>
              <SelectItem value="quarter">Последний квартал</SelectItem>
              <SelectItem value="year">Последний год</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
                <Icon name="DollarSign" size={28} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-pink-600 mb-1">Выручка</div>
                <div className="text-2xl font-bold text-pink-900">
                  {totalRevenue.toLocaleString()} ₽
                </div>
                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Icon name="TrendingUp" size={14} />
                  +12.5% к прошлому месяцу
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500">
                <Icon name="ShoppingBag" size={28} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-pink-600 mb-1">Заказов</div>
                <div className="text-2xl font-bold text-pink-900">{totalOrders}</div>
                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Icon name="TrendingUp" size={14} />
                  +8.3% к прошлому месяцу
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-400 to-violet-500">
                <Icon name="Receipt" size={28} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-pink-600 mb-1">Средний чек</div>
                <div className="text-2xl font-bold text-pink-900">
                  {avgCheck.toLocaleString()} ₽
                </div>
                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Icon name="TrendingUp" size={14} />
                  +3.7% к прошлому месяцу
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500">
                <Icon name="Target" size={28} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-pink-600 mb-1">Конверсия</div>
                <div className="text-2xl font-bold text-pink-900">
                  {conversionRate}%
                </div>
                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Icon name="TrendingUp" size={14} />
                  +0.5% к прошлому месяцу
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-pink-900">Динамика продаж</h2>
              <Button
                size="sm"
                variant="outline"
                className="border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FCE4EC" />
                <XAxis dataKey="date" stroke="#C2185B" />
                <YAxis stroke="#C2185B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #F06292",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#E91E63"
                  strokeWidth={3}
                  name="Выручка (₽)"
                  dot={{ fill: "#C2185B", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-pink-900">Количество заказов</h2>
              <Button
                size="sm"
                variant="outline"
                className="border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FCE4EC" />
                <XAxis dataKey="date" stroke="#C2185B" />
                <YAxis stroke="#C2185B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #F06292",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#E91E63" name="Заказов" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-pink-900 mb-6">
              Продажи по категориям
            </h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {categoryData.map((category, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-pink-700">{category.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-pink-900 mb-6">
              Топ-5 товаров
            </h2>
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium text-pink-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-pink-600">
                        Продано: {product.sales} шт
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-900">
                      {product.revenue.toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-pink-600">выручка</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">248</div>
                <div className="text-sm text-pink-600">Новых клиентов</div>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Icon name="TrendingUp" size={12} />
              +18.2% к прошлому месяцу
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                <Icon name="Repeat" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">42%</div>
                <div className="text-sm text-pink-600">Повторные покупки</div>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Icon name="TrendingUp" size={12} />
              +5.1% к прошлому месяцу
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                <Icon name="Star" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">4.8</div>
                <div className="text-sm text-pink-600">Средняя оценка</div>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Icon name="TrendingUp" size={12} />
              +0.3 к прошлому месяцу
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;