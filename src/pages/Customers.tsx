import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive" | "vip";
  city: string;
  notes: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Анна Иванова",
      email: "anna@example.com",
      phone: "+7 (999) 123-45-67",
      registrationDate: "2024-08-15",
      totalOrders: 12,
      totalSpent: 95800,
      lastOrder: "2025-09-30",
      status: "vip",
      city: "Москва",
      notes: "Постоянный клиент, предпочитает женскую одежду премиум класса",
    },
    {
      id: 2,
      name: "Петр Сидоров",
      email: "petr@example.com",
      phone: "+7 (999) 765-43-21",
      registrationDate: "2024-09-01",
      totalOrders: 5,
      totalSpent: 35000,
      lastOrder: "2025-09-29",
      status: "active",
      city: "Санкт-Петербург",
      notes: "Интересуется спортивной одеждой",
    },
    {
      id: 3,
      name: "Мария Петрова",
      email: "maria@example.com",
      phone: "+7 (999) 555-66-77",
      registrationDate: "2024-07-20",
      totalOrders: 3,
      totalSpent: 8970,
      lastOrder: "2025-09-28",
      status: "active",
      city: "Казань",
      notes: "",
    },
    {
      id: 4,
      name: "Иван Смирнов",
      email: "ivan@example.com",
      phone: "+7 (999) 111-22-33",
      registrationDate: "2024-06-10",
      totalOrders: 1,
      totalSpent: 2990,
      lastOrder: "2024-06-15",
      status: "inactive",
      city: "Екатеринбург",
      notes: "",
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const statusConfig = {
    active: { label: "Активный", color: "bg-green-100 text-green-700 border-green-200" },
    inactive: { label: "Неактивный", color: "bg-gray-100 text-gray-700 border-gray-200" },
    vip: { label: "VIP", color: "bg-purple-100 text-purple-700 border-purple-200" },
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsOpen(true);
  };

  const handleStatusChange = (customerId: number, newStatus: Customer["status"]) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    );
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer({ ...selectedCustomer, status: newStatus });
    }
  };

  const handleNotesUpdate = (customerId: number, notes: string) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId ? { ...customer, notes } : customer
      )
    );
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer({ ...selectedCustomer, notes });
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    vip: customers.filter((c) => c.status === "vip").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgSpent: Math.round(
      customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length
    ),
  };

  const orderHistory = [
    { id: 1001, date: "2025-09-30", total: 7980, status: "completed" },
    { id: 998, date: "2025-09-15", total: 12500, status: "completed" },
    { id: 985, date: "2025-08-28", total: 8900, status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <div className="text-sm text-pink-600 mb-2">CRM</div>
          <h1 className="text-4xl font-bold text-pink-900">Клиенты</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{stats.total}</div>
                <div className="text-sm text-pink-600">Всего клиентов</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                <Icon name="UserCheck" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{stats.active}</div>
                <div className="text-sm text-pink-600">Активных</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-400 to-violet-500">
                <Icon name="Crown" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{stats.vip}</div>
                <div className="text-sm text-pink-600">VIP клиентов</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500">
                <Icon name="DollarSign" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">
                  {stats.avgSpent.toLocaleString()} ₽
                </div>
                <div className="text-sm text-pink-600">Средний LTV</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по имени, email или телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-pink-200"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 border-pink-200">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="border-pink-200 bg-white/80 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-100 hover:to-rose-100">
                <TableHead className="text-pink-900 font-bold">Клиент</TableHead>
                <TableHead className="text-pink-900 font-bold">Контакты</TableHead>
                <TableHead className="text-pink-900 font-bold">Город</TableHead>
                <TableHead className="text-pink-900 font-bold">Заказов</TableHead>
                <TableHead className="text-pink-900 font-bold">Потрачено</TableHead>
                <TableHead className="text-pink-900 font-bold">Последний заказ</TableHead>
                <TableHead className="text-pink-900 font-bold">Статус</TableHead>
                <TableHead className="text-pink-900 font-bold text-right">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-pink-50/50">
                  <TableCell className="font-medium text-pink-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{customer.name}</div>
                        <div className="text-xs text-pink-600">
                          ID: {customer.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-pink-700">
                    <div className="text-sm">{customer.email}</div>
                    <div className="text-xs text-pink-600">{customer.phone}</div>
                  </TableCell>
                  <TableCell className="text-pink-700">{customer.city}</TableCell>
                  <TableCell className="text-pink-900 font-semibold">
                    {customer.totalOrders}
                  </TableCell>
                  <TableCell className="text-pink-900 font-semibold">
                    {customer.totalSpent.toLocaleString()} ₽
                  </TableCell>
                  <TableCell className="text-pink-700">{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[customer.status].color}
                    >
                      {statusConfig[customer.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleViewCustomer(customer)}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    >
                      <Icon name="Eye" size={16} className="mr-2" />
                      Подробнее
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-pink-900 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-xl">
                  {selectedCustomer?.name.charAt(0)}
                </div>
                {selectedCustomer?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedCustomer && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Информация</TabsTrigger>
                  <TabsTrigger value="orders">История заказов</TabsTrigger>
                  <TabsTrigger value="notes">Заметки</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 border-pink-200 bg-pink-50">
                      <div className="text-sm text-pink-600 mb-1">Email</div>
                      <div className="font-medium text-pink-900">
                        {selectedCustomer.email}
                      </div>
                    </Card>
                    <Card className="p-4 border-pink-200 bg-pink-50">
                      <div className="text-sm text-pink-600 mb-1">Телефон</div>
                      <div className="font-medium text-pink-900">
                        {selectedCustomer.phone}
                      </div>
                    </Card>
                    <Card className="p-4 border-pink-200 bg-pink-50">
                      <div className="text-sm text-pink-600 mb-1">Город</div>
                      <div className="font-medium text-pink-900">
                        {selectedCustomer.city}
                      </div>
                    </Card>
                    <Card className="p-4 border-pink-200 bg-pink-50">
                      <div className="text-sm text-pink-600 mb-1">Дата регистрации</div>
                      <div className="font-medium text-pink-900">
                        {selectedCustomer.registrationDate}
                      </div>
                    </Card>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
                      <div className="text-sm text-pink-600 mb-2">Всего заказов</div>
                      <div className="text-3xl font-bold text-pink-900">
                        {selectedCustomer.totalOrders}
                      </div>
                    </Card>
                    <Card className="p-4 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
                      <div className="text-sm text-pink-600 mb-2">Потрачено</div>
                      <div className="text-3xl font-bold text-pink-900">
                        {selectedCustomer.totalSpent.toLocaleString()} ₽
                      </div>
                    </Card>
                    <Card className="p-4 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
                      <div className="text-sm text-pink-600 mb-2">Средний чек</div>
                      <div className="text-3xl font-bold text-pink-900">
                        {Math.round(
                          selectedCustomer.totalSpent / selectedCustomer.totalOrders
                        ).toLocaleString()}{" "}
                        ₽
                      </div>
                    </Card>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-pink-900 mb-2 block">
                      Статус клиента
                    </label>
                    <Select
                      value={selectedCustomer.status}
                      onValueChange={(value) =>
                        handleStatusChange(
                          selectedCustomer.id,
                          value as Customer["status"]
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активный</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="inactive">Неактивный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <div className="border border-pink-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-pink-50">
                          <TableHead className="text-pink-900">№ Заказа</TableHead>
                          <TableHead className="text-pink-900">Дата</TableHead>
                          <TableHead className="text-pink-900">Сумма</TableHead>
                          <TableHead className="text-pink-900">Статус</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-bold text-pink-900">
                              #{order.id}
                            </TableCell>
                            <TableCell className="text-pink-700">{order.date}</TableCell>
                            <TableCell className="font-semibold text-pink-900">
                              {order.total.toLocaleString()} ₽
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-700">
                                Завершен
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-pink-900 mb-2 block">
                      Заметки о клиенте
                    </label>
                    <Textarea
                      value={selectedCustomer.notes}
                      onChange={(e) =>
                        handleNotesUpdate(selectedCustomer.id, e.target.value)
                      }
                      placeholder="Добавьте заметки о клиенте..."
                      rows={8}
                      className="border-pink-200"
                    />
                  </div>
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить заметки
                  </Button>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Customers;