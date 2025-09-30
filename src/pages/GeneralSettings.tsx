import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const GeneralSettings = () => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<string[]>(["account"]);
  const [showHelp, setShowHelp] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleHelp = (helpId: string) => {
    setShowHelp(prev => ({ ...prev, [helpId]: !prev[helpId] }));
  };

  const handleSave = (sectionName: string) => {
    toast({
      title: "Настройки сохранены",
      description: `${sectionName} успешно обновлены`
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              <a href="/" className="hover:underline">Главная</a> &gt; Общие настройки
            </div>
            <h1 className="text-3xl font-bold">Общие настройки</h1>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
              <TabsTrigger value="general">Общие настройки</TabsTrigger>
              <TabsTrigger value="administrators">Администраторы сайта</TabsTrigger>
              <TabsTrigger value="sms">Уведомления по SMS</TabsTrigger>
              <TabsTrigger value="telegram">Уведомления в Telegram</TabsTrigger>
              <TabsTrigger value="email">Уведомления по е-мейл</TabsTrigger>
              <TabsTrigger value="senders">Отправители е-мейл</TabsTrigger>
              <TabsTrigger value="copy">Копирование данных</TabsTrigger>
              <TabsTrigger value="backups">Резервные копии</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("account")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("account") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Настройки аккаунта</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("account") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Логин</Label>
                      <div className="text-lg">user@example.com</div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" defaultValue="user@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон моб.</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="phone" type="tel" placeholder="формат: +70000000000" defaultValue="+79001234567" />
                        <Badge className="bg-green-500">номер подтвержден</Badge>
                      </div>
                    </div>
                    <Button onClick={() => handleSave("Настройки аккаунта")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("password")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("password") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Смена пароля</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("password") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Новый пароль</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Пароль еще раз</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="old-password">Старый пароль</Label>
                      <Input id="old-password" type="password" />
                    </div>
                    <Button onClick={() => handleSave("Пароль")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("2fa")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("2fa") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Двухэтапная авторизация</CardTitle>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); toggleHelp("2fa"); }}>
                      <Icon name="HelpCircle" size={16} />
                    </Button>
                  </div>
                  {showHelp["2fa"] && (
                    <CardDescription>
                      Авторизация в два этапа: после введения логина и пароля будет запрошен одноразовый код авторизации по SMS, емейл или т.п.
                    </CardDescription>
                  )}
                </CardHeader>
                {expandedSections.includes("2fa") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auth-method">Основной метод</Label>
                      <Select defaultValue="0">
                        <SelectTrigger id="auth-method">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Отключен</SelectItem>
                          <SelectItem value="1">Код по SMS</SelectItem>
                          <SelectItem value="2">Код на емейл</SelectItem>
                          <SelectItem value="3">Код в Telegram</SelectItem>
                          <SelectItem value="4">Google Authenticator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label>Методы авторизации</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sms-auth" />
                        <label htmlFor="sms-auth">Код по SMS</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="email-auth" />
                        <label htmlFor="email-auth">Код на емейл</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="telegram-auth" />
                        <label htmlFor="telegram-auth">Код в Telegram</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="google-auth" />
                        <label htmlFor="google-auth">Google Authenticator</label>
                      </div>
                    </div>
                    <Button onClick={() => handleSave("Двухэтапная авторизация")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("telegram")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("telegram") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Привязать телеграм-аккаунт</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("telegram") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Аккаунт в Telegram</Label>
                      <div className="flex items-center gap-2">
                        <span>Магазин (@shop_bot)</span>
                        <Button variant="link" className="text-destructive">отвязать</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Позволяет входить в панель управления через телеграм, а также получать уведомления от нашего бота.
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("domain")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("domain") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Отдельный домен</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("domain") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Отдельный домен</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="domain" defaultValue="myshop.ru" />
                        <Badge className="bg-green-500">подключен</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Если у вас есть отдельный домен, здесь его можно прикрепить к интернет-магазину.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>DNS-записи</Label>
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" className="mr-2" size={16} />
                        Добавить запись
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Зеркала сайта</Label>
                      <Button variant="outline" size="sm">Добавить зеркало</Button>
                    </div>
                    <Button onClick={() => handleSave("Домен")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("mail")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("mail") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Почта на домене</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("mail") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mail-service">Почтовая служба</Label>
                      <Select defaultValue="0">
                        <SelectTrigger id="mail-service">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Не подключена</SelectItem>
                          <SelectItem value="4">Яндекс 360</SelectItem>
                          <SelectItem value="1">Zoho Mail</SelectItem>
                          <SelectItem value="2">VK WorkMail</SelectItem>
                          <SelectItem value="3">Google Workspace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => handleSave("Почта на домене")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("redirect")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("redirect") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Переадресация (redirect)</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("redirect") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain-redirect">Переадресация доменов</Label>
                      <Textarea id="domain-redirect" rows={5} placeholder="domain1 domain2&#10;domain3 domain4" />
                      <p className="text-sm text-muted-foreground">
                        Домены для переадресации можно задать в формате: domain1 domain2
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url-redirect">Переадресация страниц</Label>
                      <Textarea id="url-redirect" rows={5} placeholder="URL1 URL2&#10;URL3 URL4" />
                      <p className="text-sm text-muted-foreground">
                        Адреса страниц (URL) для переадресации можно задать в формате: URL1 URL2
                      </p>
                    </div>
                    <Button onClick={() => handleSave("Переадресация")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("sitemap")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("sitemap") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Файл SITEMAP (для поисковых систем)</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("sitemap") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sitemap-toggle">Файл sitemap</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="sitemap-toggle">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Не создавать файл</SelectItem>
                          <SelectItem value="1">Создавать файл</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Адрес файла SITEMAP</Label>
                      <div className="flex gap-2 items-center">
                        <span>https://myshop.ru/sitemap.xml</span>
                        <Button variant="link" size="sm">обновить файл</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Файл обновляется автоматически один раз в сутки. При необходимости можно обновить файл вручную.
                      </p>
                    </div>
                    <Button onClick={() => handleSave("Sitemap")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("watermark")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("watermark") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Качество изображений и водяной знак</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("watermark") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="watermark-position">Водяной знак</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="watermark-position">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Нет</SelectItem>
                          <SelectItem value="1">В левом верхнем углу</SelectItem>
                          <SelectItem value="2">В правом верхнем углу</SelectItem>
                          <SelectItem value="3">В левом нижнем углу</SelectItem>
                          <SelectItem value="4">В правом нижнем углу</SelectItem>
                          <SelectItem value="5">В центре</SelectItem>
                          <SelectItem value="6">В центре вверху</SelectItem>
                          <SelectItem value="7">В центре внизу</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="watermark-file">Файл картинки</Label>
                      <Input id="watermark-file" type="file" accept="image/png" />
                      <p className="text-sm text-muted-foreground">
                        Рекомендуется делать полупрозрачную картинку в формате PNG.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image-quality">Качество</Label>
                      <Input id="image-quality" type="number" min="1" max="100" defaultValue="90" />
                      <p className="text-sm text-muted-foreground">
                        Качество уменьшенных копий изображений (от 1 до 100). Оптимальное значение = 80.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webp-format">Формат WebP</Label>
                      <Select defaultValue="0">
                        <SelectTrigger id="webp-format">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Включен</SelectItem>
                          <SelectItem value="1">Отключен</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => handleSave("Изображения и водяной знак")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("panel")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("panel") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Настройки панели управления</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("panel") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="items-per-page">Элементов на странице</Label>
                      <Input id="items-per-page" type="number" defaultValue="100" />
                    </div>
                    <div className="space-y-3">
                      <Label>Уведомления от браузера</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notif-orders" defaultChecked />
                        <label htmlFor="notif-orders">о новых заказах</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notif-messages" defaultChecked />
                        <label htmlFor="notif-messages">о новых сообщениях</label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Часовой пояс</Label>
                      <Select defaultValue="Europe/Moscow">
                        <SelectTrigger id="timezone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Moscow">Europe/Moscow</SelectItem>
                          <SelectItem value="Asia/Irkutsk">Asia/Irkutsk</SelectItem>
                          <SelectItem value="Asia/Vladivostok">Asia/Vladivostok</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                          <SelectItem value="America/New_York">America/New_York</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => handleSave("Настройки панели управления")}>Сохранить</Button>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("accounts")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("accounts") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle>Привязать аккаунты (другие магазины на платформе)</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("accounts") && (
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Нет привязанных аккаунтов.</p>
                    <div className="space-y-2">
                      <Label>Привязать аккаунт</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Логин" />
                        <Input type="password" placeholder="Пароль" />
                        <Button>Привязать</Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card className="border-destructive">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection("delete")}>
                  <div className="flex items-center gap-2">
                    <Icon name={expandedSections.includes("delete") ? "ChevronDown" : "ChevronRight"} size={20} />
                    <CardTitle className="text-destructive">Удаление сайта</CardTitle>
                  </div>
                </CardHeader>
                {expandedSections.includes("delete") && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="delete-password">Текущий пароль</Label>
                      <Input id="delete-password" type="password" />
                      <p className="text-sm text-destructive font-medium">
                        Внимание! Интернет-магазин удаляется из системы полностью без возможности последующего восстановления данных!
                      </p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        if (confirm('Действительно удалить сайт? Восстановление сайта будет невозможно!')) {
                          toast({
                            title: "Удаление отменено",
                            description: "Это демо-версия. Удаление недоступно.",
                            variant: "destructive"
                          });
                        }
                      }}
                    >
                      Удалить сайт
                    </Button>
                  </CardContent>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="administrators">
              <Card>
                <CardHeader>
                  <CardTitle>Администраторы сайта</CardTitle>
                  <CardDescription>Управление доступом администраторов к панели управления</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Функционал в разработке</p>
                  <Button>
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить администратора
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sms">
              <Card>
                <CardHeader>
                  <CardTitle>Уведомления по SMS</CardTitle>
                  <CardDescription>Настройка SMS-уведомлений о событиях в магазине</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="telegram">
              <Card>
                <CardHeader>
                  <CardTitle>Уведомления в Telegram</CardTitle>
                  <CardDescription>Настройка уведомлений через Telegram-бота</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Уведомления по е-мейл</CardTitle>
                  <CardDescription>Настройка email-уведомлений</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="senders">
              <Card>
                <CardHeader>
                  <CardTitle>Отправители е-мейл</CardTitle>
                  <CardDescription>Настройка адресов отправки писем</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="copy">
              <Card>
                <CardHeader>
                  <CardTitle>Копирование данных на другие аккаунты</CardTitle>
                  <CardDescription>Перенос данных между аккаунтами</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backups">
              <Card>
                <CardHeader>
                  <CardTitle>Резервные копии</CardTitle>
                  <CardDescription>Создание и восстановление резервных копий данных</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Последняя резервная копия</div>
                      <div className="text-sm text-muted-foreground">29.09.2024 23:45</div>
                    </div>
                    <Button variant="outline">
                      <Icon name="Download" className="mr-2" size={16} />
                      Скачать
                    </Button>
                  </div>
                  <Button>
                    <Icon name="Save" className="mr-2" size={16} />
                    Создать новую копию
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default GeneralSettings;