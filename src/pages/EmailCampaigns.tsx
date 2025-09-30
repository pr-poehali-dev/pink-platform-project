import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: "draft" | "scheduled" | "sent" | "active";
  segment: string;
  sent: number;
  opened: number;
  clicked: number;
  scheduled?: string;
  created: string;
}

const EmailCampaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Скидка 20% для VIP клиентов",
      subject: "Эксклюзивное предложение для вас!",
      status: "sent",
      segment: "VIP клиенты",
      sent: 145,
      opened: 98,
      clicked: 42,
      created: "2024-09-25"
    },
    {
      id: "2",
      name: "Новая коллекция весна 2024",
      subject: "Встречайте новинки сезона",
      status: "sent",
      segment: "Все активные",
      sent: 823,
      opened: 456,
      clicked: 187,
      created: "2024-09-20"
    },
    {
      id: "3",
      name: "Возвращайтесь к покупкам",
      subject: "Мы скучаем по вам",
      status: "scheduled",
      segment: "Неактивные 30+ дней",
      sent: 0,
      opened: 0,
      clicked: 0,
      scheduled: "2024-10-05 10:00",
      created: "2024-09-28"
    },
    {
      id: "4",
      name: "Персональные рекомендации",
      subject: "Подборка специально для вас",
      status: "draft",
      segment: "Активные клиенты",
      sent: 0,
      opened: 0,
      clicked: 0,
      created: "2024-09-29"
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    subject: "",
    segment: "",
    message: "",
    scheduleDate: "",
    scheduleTime: ""
  });

  const getStatusColor = (status: Campaign["status"]) => {
    const colors = {
      draft: "bg-gray-500",
      scheduled: "bg-blue-500",
      sent: "bg-green-500",
      active: "bg-purple-500"
    };
    return colors[status];
  };

  const getStatusText = (status: Campaign["status"]) => {
    const texts = {
      draft: "Черновик",
      scheduled: "Запланирована",
      sent: "Отправлена",
      active: "Активна"
    };
    return texts[status];
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.segment) {
      toast({
        title: "Заполните все поля",
        description: "Название, тема и сегмент обязательны для создания рассылки",
        variant: "destructive"
      });
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      subject: newCampaign.subject,
      status: newCampaign.scheduleDate ? "scheduled" : "draft",
      segment: newCampaign.segment,
      sent: 0,
      opened: 0,
      clicked: 0,
      scheduled: newCampaign.scheduleDate ? `${newCampaign.scheduleDate} ${newCampaign.scheduleTime}` : undefined,
      created: new Date().toISOString().split('T')[0]
    };

    setCampaigns([campaign, ...campaigns]);
    setNewCampaign({
      name: "",
      subject: "",
      segment: "",
      message: "",
      scheduleDate: "",
      scheduleTime: ""
    });

    toast({
      title: "Рассылка создана",
      description: `${campaign.name} успешно ${campaign.status === "scheduled" ? "запланирована" : "сохранена как черновик"}`
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Email-рассылки</h1>
            <p className="text-muted-foreground">Создавайте и отправляйте email-кампании клиентам</p>
          </div>

          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList>
              <TabsTrigger value="campaigns">
                <Icon name="Mail" className="mr-2" size={16} />
                Все рассылки
              </TabsTrigger>
              <TabsTrigger value="create">
                <Icon name="Plus" className="mr-2" size={16} />
                Создать рассылку
              </TabsTrigger>
              <TabsTrigger value="templates">
                <Icon name="FileText" className="mr-2" size={16} />
                Шаблоны
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Icon name="Bell" className="mr-2" size={16} />
                Уведомления
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Всего рассылок</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{campaigns.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Отправлено писем</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{campaigns.reduce((acc, c) => acc + c.sent, 0)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Открываемость</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {campaigns.reduce((acc, c) => acc + c.sent, 0) > 0
                        ? Math.round((campaigns.reduce((acc, c) => acc + c.opened, 0) / campaigns.reduce((acc, c) => acc + c.sent, 0)) * 100)
                        : 0}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">CTR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {campaigns.reduce((acc, c) => acc + c.opened, 0) > 0
                        ? Math.round((campaigns.reduce((acc, c) => acc + c.clicked, 0) / campaigns.reduce((acc, c) => acc + c.opened, 0)) * 100)
                        : 0}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>История рассылок</CardTitle>
                  <CardDescription>Список всех созданных email-кампаний</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{campaign.name}</h3>
                              <Badge className={getStatusColor(campaign.status)}>{getStatusText(campaign.status)}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{campaign.subject}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Icon name="Users" size={14} />
                                {campaign.segment}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                {campaign.scheduled || campaign.created}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                        {campaign.sent > 0 && (
                          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                            <div>
                              <div className="text-xs text-muted-foreground">Отправлено</div>
                              <div className="text-lg font-semibold">{campaign.sent}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Открыто</div>
                              <div className="text-lg font-semibold">
                                {campaign.opened} <span className="text-sm text-muted-foreground">({Math.round((campaign.opened / campaign.sent) * 100)}%)</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Переходы</div>
                              <div className="text-lg font-semibold">
                                {campaign.clicked} <span className="text-sm text-muted-foreground">({Math.round((campaign.clicked / campaign.opened) * 100)}%)</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Создать новую рассылку</CardTitle>
                  <CardDescription>Заполните информацию для создания email-кампании</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Название кампании</Label>
                    <Input
                      id="campaign-name"
                      placeholder="Например: Летняя распродажа 2024"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема письма</Label>
                    <Input
                      id="subject"
                      placeholder="Скидки до 50% на всё!"
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segment">Сегмент получателей</Label>
                    <Select value={newCampaign.segment} onValueChange={(value) => setNewCampaign({ ...newCampaign, segment: value })}>
                      <SelectTrigger id="segment">
                        <SelectValue placeholder="Выберите сегмент" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все клиенты</SelectItem>
                        <SelectItem value="active">Активные клиенты</SelectItem>
                        <SelectItem value="vip">VIP клиенты</SelectItem>
                        <SelectItem value="inactive">Неактивные 30+ дней</SelectItem>
                        <SelectItem value="new">Новые клиенты</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Текст письма</Label>
                    <Textarea
                      id="message"
                      placeholder="Введите текст вашего письма..."
                      rows={8}
                      value={newCampaign.message}
                      onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule-date">Дата отправки (необязательно)</Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={newCampaign.scheduleDate}
                        onChange={(e) => setNewCampaign({ ...newCampaign, scheduleDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Время отправки</Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={newCampaign.scheduleTime}
                        onChange={(e) => setNewCampaign({ ...newCampaign, scheduleTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateCampaign} className="flex-1">
                      <Icon name="Send" className="mr-2" size={16} />
                      {newCampaign.scheduleDate ? "Запланировать отправку" : "Сохранить как черновик"}
                    </Button>
                    <Button variant="outline">
                      <Icon name="Eye" className="mr-2" size={16} />
                      Предпросмотр
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Шаблоны писем</CardTitle>
                  <CardDescription>Готовые шаблоны для быстрого создания рассылок</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Приветственное письмо", icon: "Mail", desc: "Для новых клиентов" },
                      { name: "Скидка на день рождения", icon: "Gift", desc: "Персональное поздравление" },
                      { name: "Брошенная корзина", icon: "ShoppingCart", desc: "Напоминание о товарах" },
                      { name: "Акция недели", icon: "Tag", desc: "Специальные предложения" },
                      { name: "Новая коллекция", icon: "Sparkles", desc: "Анонс новинок" },
                      { name: "Реактивация", icon: "RefreshCw", desc: "Вернуть клиента" }
                    ].map((template, idx) => (
                      <Card key={idx} className="cursor-pointer hover:border-primary transition-colors">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Icon name={template.icon} size={20} className="text-primary" />
                            <CardTitle className="text-base">{template.name}</CardTitle>
                          </div>
                          <CardDescription>{template.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" size="sm" className="w-full">
                            Использовать шаблон
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Автоматические уведомления</CardTitle>
                  <CardDescription>Настройте триггерные email для событий в магазине</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Новый заказ", desc: "Подтверждение заказа клиенту", active: true },
                      { title: "Заказ отправлен", desc: "Уведомление об отправке с трек-номером", active: true },
                      { title: "Заказ доставлен", desc: "Подтверждение доставки", active: true },
                      { title: "Оставьте отзыв", desc: "Через 3 дня после доставки", active: false },
                      { title: "Брошенная корзина", desc: "Через 1 час после добавления товара", active: true },
                      { title: "Товар снова в наличии", desc: "Если клиент подписался на уведомление", active: false },
                      { title: "Снижение цены", desc: "Для товаров из избранного", active: false }
                    ].map((notification, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.active ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <Icon name={notification.active ? "Check" : "X"} size={20} className={notification.active ? 'text-green-600' : 'text-gray-400'} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground">{notification.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button variant={notification.active ? "default" : "outline"} size="sm">
                            {notification.active ? "Активно" : "Включить"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default EmailCampaigns;