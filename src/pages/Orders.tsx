import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  customer: string;
  phone: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: "new" | "processing" | "shipped" | "completed" | "cancelled";
  paymentMethod: string;
  deliveryAddress: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      date: "2025-09-30 14:23",
      customer: "Анна Иванова",
      phone: "+7 (999) 123-45-67",
      email: "anna@example.com",
      items: [
        { name: "Платье летнее", quantity: 1, price: 2990 },
        { name: "Кроссовки спортивные", quantity: 1, price: 4990 },
      ],
      total: 7980,
      status: "new",
      paymentMethod: "Картой онлайн",
      deliveryAddress: "Москва, ул. Ленина, д. 10, кв. 5",
    },
    {
      id: 1002,
      date: "2025-09-29 18:45",
      customer: "Петр Сидоров",
      phone: "+7 (999) 765-43-21",
      email: "petr@example.com",
      items: [{ name: "Джинсы классические", quantity: 2, price: 3500 }],
      total: 7000,
      status: "processing",
      paymentMethod: "Наличными при получении",
      deliveryAddress: "Санкт-Петербург, пр. Невский, д. 25",
    },
    {
      id: 1003,
      date: "2025-09-28 10:15",
      customer: "Мария Петрова",
      phone: "+7 (999) 555-66-77",
      email: "maria@example.com",
      items: [{ name: "Платье летнее", quantity: 1, price: 2990 }],
      total: 2990,
      status: "completed",
      paymentMethod: "Картой онлайн",
      deliveryAddress: "Казань, ул. Баумана, д. 50, кв. 12",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const statusConfig = {
    new: { label: "Новый", color: "bg-blue-100 text-blue-700 border-blue-200" },
    processing: { label: "В обработке", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    shipped: { label: "Отправлен", color: "bg-purple-100 text-purple-700 border-purple-200" },
    completed: { label: "Завершен", color: "bg-green-100 text-green-700 border-green-200" },
    cancelled: { label: "Отменен", color: "bg-red-100 text-red-700 border-red-200" },
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      new: orders.filter((o) => o.status === "new").length,
      processing: orders.filter((o) => o.status === "processing").length,
      completed: orders.filter((o) => o.status === "completed").length,
      revenue: orders
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + o.total, 0),
    };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <div className="text-sm text-pink-600 mb-2">Мой магазин</div>
          <h1 className="text-4xl font-bold text-pink-900">Заказы</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
                <Icon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{stats.total}</div>
                <div className="text-sm text-pink-600">Всего заказов</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500">
                <Icon name="Clock" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{stats.new}</div>
                <div className="text-sm text-pink-600">Новых</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                <Icon name="Package" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{stats.processing}</div>
                <div className="text-sm text-pink-600">В обработке</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                <Icon name="DollarSign" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">
                  {stats.revenue.toLocaleString()} ₽
                </div>
                <div className="text-sm text-pink-600">Выручка</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border-pink-200 bg-white/80 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-100 hover:to-rose-100">
                <TableHead className="text-pink-900 font-bold">№ Заказа</TableHead>
                <TableHead className="text-pink-900 font-bold">Дата</TableHead>
                <TableHead className="text-pink-900 font-bold">Клиент</TableHead>
                <TableHead className="text-pink-900 font-bold">Телефон</TableHead>
                <TableHead className="text-pink-900 font-bold">Сумма</TableHead>
                <TableHead className="text-pink-900 font-bold">Статус</TableHead>
                <TableHead className="text-pink-900 font-bold text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-pink-50/50">
                  <TableCell className="font-bold text-pink-900">
                    #{order.id}
                  </TableCell>
                  <TableCell className="text-pink-700">{order.date}</TableCell>
                  <TableCell className="font-medium text-pink-900">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-pink-700">{order.phone}</TableCell>
                  <TableCell className="text-pink-900 font-semibold">
                    {order.total.toLocaleString()} ₽
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[order.status].color}
                    >
                      {statusConfig[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    >
                      <Icon name="Eye" size={16} className="mr-2" />
                      Просмотр
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-pink-900">
                Заказ #{selectedOrder?.id}
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-pink-600 block mb-2">
                      Статус заказа
                    </label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) =>
                        handleStatusChange(selectedOrder.id, value as Order["status"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новый</SelectItem>
                        <SelectItem value="processing">В обработке</SelectItem>
                        <SelectItem value="shipped">Отправлен</SelectItem>
                        <SelectItem value="completed">Завершен</SelectItem>
                        <SelectItem value="cancelled">Отменен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-pink-600 block mb-2">
                      Дата заказа
                    </label>
                    <div className="p-2 bg-pink-50 rounded text-pink-900">
                      {selectedOrder.date}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg space-y-2">
                  <h3 className="font-semibold text-pink-900 mb-3">Информация о клиенте</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-pink-600">Имя:</span>
                      <p className="font-medium text-pink-900">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <span className="text-sm text-pink-600">Телефон:</span>
                      <p className="font-medium text-pink-900">{selectedOrder.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-pink-600">Email:</span>
                      <p className="font-medium text-pink-900">{selectedOrder.email}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-pink-600">Адрес доставки:</span>
                      <p className="font-medium text-pink-900">
                        {selectedOrder.deliveryAddress}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-pink-600">Способ оплаты:</span>
                      <p className="font-medium text-pink-900">
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-pink-900 mb-3">Состав заказа</h3>
                  <div className="border border-pink-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-pink-50">
                          <TableHead className="text-pink-900">Товар</TableHead>
                          <TableHead className="text-pink-900 text-center">Кол-во</TableHead>
                          <TableHead className="text-pink-900 text-right">Цена</TableHead>
                          <TableHead className="text-pink-900 text-right">Сумма</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium text-pink-900">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center text-pink-700">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right text-pink-700">
                              {item.price.toLocaleString()} ₽
                            </TableCell>
                            <TableCell className="text-right font-semibold text-pink-900">
                              {(item.quantity * item.price).toLocaleString()} ₽
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-pink-50">
                          <TableCell colSpan={3} className="font-bold text-pink-900">
                            Итого:
                          </TableCell>
                          <TableCell className="text-right font-bold text-pink-900 text-lg">
                            {selectedOrder.total.toLocaleString()} ₽
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Закрыть
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Icon name="Printer" size={16} className="mr-2" />
                    Печать
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Orders;