import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<string[]>(["account"]);
  
  const [accountData, setAccountData] = useState({
    login: "user123",
    email: "user@example.com",
    phone: "+79001234567",
    phoneVerified: true
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
    oldPassword: ""
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    mainMethod: "0",
    methods: [] as string[]
  });

  const [domainData, setDomainData] = useState({
    domain: "myshop.ru",
    domainConnected: true,
    mirrors: [] as string[]
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSaveAccount = () => {
    toast({
      title: "Настройки сохранены",
      description: "Данные аккаунта успешно обновлены"
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Пароль изменен",
      description: "Новый пароль успешно установлен"
    });
    
    setPasswordData({ newPassword: "", confirmPassword: "", oldPassword: "" });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-2">
                <a href="/" className="hover:text-foreground">Главная</a> &gt; Общие настройки
              </div>
              <h1 className="text-3xl font-bold">Общие настройки</h1>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <div className="border-b">
                <TabsList className="h-auto flex-wrap justify-start bg-transparent">
                  <TabsTrigger value="general" className="data-[state=active]:bg-accent">
                    Общие настройки
                  </TabsTrigger>
                  <TabsTrigger value="administrators">
                    Администраторы сайта
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    Уведомления по SMS
                  </TabsTrigger>
                  <TabsTrigger value="telegram">
                    Уведомления в Telegram
                  </TabsTrigger>
                  <TabsTrigger value="emails">
                    Уведомления по е-мейл
                  </TabsTrigger>
                  <TabsTrigger value="senders">
                    Отправители е-мейл
                  </TabsTrigger>
                  <TabsTrigger value="copy">
                    Копирование данных
                  </TabsTrigger>
                  <TabsTrigger value="backups">
                    Резервные копии
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("account")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("account") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Настройки аккаунта</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("account") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Логин</Label>
                        <div className="text-sm text-muted-foreground">{accountData.login}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={accountData.email}
                          onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон моб.</Label>
                        <Input
                          id="phone"
                          value={accountData.phone}
                          disabled={accountData.phoneVerified}
                          className={cn(accountData.phoneVerified && "text-muted-foreground")}
                        />
                        {accountData.phoneVerified && (
                          <p className="text-sm text-green-600">✓ номер подтвержден</p>
                        )}
                      </div>

                      <Button onClick={handleSaveAccount}>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("password")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("password") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Смена пароля</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("password") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Новый пароль</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Пароль еще раз</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="old-password">Старый пароль</Label>
                        <Input
                          id="old-password"
                          type="password"
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                        />
                      </div>

                      <Button onClick={handleChangePassword}>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("2fa")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("2fa") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Двухэтапная авторизация</CardTitle>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Icon name="HelpCircle" size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("2fa") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="auth-method">Основной метод</Label>
                        <Select 
                          value={twoFactorAuth.mainMethod} 
                          onValueChange={(value) => setTwoFactorAuth({...twoFactorAuth, mainMethod: value})}
                        >
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

                      <div className="space-y-2">
                        <Label>Методы авторизации</Label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span>Код по SMS</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span>Код на емейл</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span>Код в Telegram</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span>Google Authenticator</span>
                          </label>
                        </div>
                      </div>

                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("telegram-link")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("telegram-link") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Привязать телеграм-аккаунт</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("telegram-link") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Аккаунт в Telegram</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">@myshop_bot</span>
                          <Button variant="link" className="h-auto p-0">отвязать</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Позволяет входить в панель управления через телеграм и получать уведомления
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("domain")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("domain") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Отдельный домен</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("domain") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="domain">Отдельный домен</Label>
                        <Input
                          id="domain"
                          value={domainData.domain}
                          onChange={(e) => setDomainData({...domainData, domain: e.target.value})}
                        />
                        {domainData.domainConnected && (
                          <p className="text-sm text-green-600">✓ подключен</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>DNS-записи</Label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input placeholder="Название" className="w-32" />
                            <Input placeholder="Значение" className="flex-1" />
                            <Button variant="ghost" size="icon">
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        </div>
                        <Button variant="link" className="h-auto p-0">
                          <Icon name="Plus" size={14} className="mr-1" />
                          Добавить запись
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Зеркала сайта</Label>
                        <Button variant="link" className="h-auto p-0">Добавить зеркало</Button>
                      </div>

                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("mail")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("mail") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
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
                        <p className="text-sm text-muted-foreground">
                          Почта на отдельном домене позволяет использовать профессиональные email-адреса
                        </p>
                      </div>
                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("redirects")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("redirects") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Переадресация (redirect)</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("redirects") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="domain-redirects">Переадресация доменов</Label>
                        <Textarea
                          id="domain-redirects"
                          placeholder="domain1 domain2&#10;domain3 domain4"
                          rows={5}
                        />
                        <p className="text-xs text-muted-foreground">
                          Домены для переадресации в формате: domain1 domain2
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="page-redirects">Переадресация страниц</Label>
                        <Textarea
                          id="page-redirects"
                          placeholder="/old-page /new-page&#10;/url1 /url2"
                          rows={5}
                        />
                        <p className="text-xs text-muted-foreground">
                          URL для переадресации в формате: URL1 URL2
                        </p>
                      </div>

                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("sitemap")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("sitemap") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Файл SITEMAP (для поисковых систем)</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("sitemap") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sitemap-enabled">Файл sitemap</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="sitemap-enabled">
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
                        <div className="flex items-center gap-2">
                          <span className="text-sm">https://myshop.ru/sitemap.xml</span>
                          <Button variant="link" className="h-auto p-0">обновить файл</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Файл обновляется автоматически один раз в сутки
                        </p>
                      </div>

                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("watermark")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("watermark") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
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
                            <SelectItem value="8">Справа по центру</SelectItem>
                            <SelectItem value="9">Слева по центру</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="watermark-file">Файл картинки</Label>
                        <Input id="watermark-file" type="file" accept="image/png" />
                        <p className="text-xs text-muted-foreground">
                          Рекомендуется полупрозрачная картинка в формате PNG
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Минимальные размеры фото для водяного знака</Label>
                        <div className="flex items-center gap-2">
                          <Input type="number" placeholder="0" className="w-20" />
                          <span>x</span>
                          <Input type="number" placeholder="0" className="w-20" />
                          <span>px</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image-quality">Качество</Label>
                        <Input
                          id="image-quality"
                          type="number"
                          min="1"
                          max="100"
                          defaultValue="90"
                          className="w-32"
                        />
                        <p className="text-xs text-muted-foreground">
                          От 1 до 100. Оптимальное значение = 80
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
                        <p className="text-xs text-muted-foreground">
                          Современный формат для уменьшения размера изображений
                        </p>
                      </div>

                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("cp-settings")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("cp-settings") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Настройки панели управления</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("cp-settings") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="items-per-page">Элементов на странице</Label>
                        <Input
                          id="items-per-page"
                          type="number"
                          defaultValue="100"
                          className="w-32"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Уведомления от браузера</Label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>о новых заказах</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>о новых сообщениях</span>
                          </label>
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
                            <SelectItem value="Europe/London">Europe/London</SelectItem>
                            <SelectItem value="America/New_York">America/New_York</SelectItem>
                            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("linked-accounts")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("linked-accounts") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Привязать аккаунты (другие магазины)</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("linked-accounts") && (
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Для привязанных аккаунтов можно управлять заказами из одного места
                      </p>
                      
                      <div className="space-y-4">
                        <p className="text-sm">Нет привязанных аккаунтов</p>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label>Привязать аккаунт</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="link-login">Логин</Label>
                              <Input id="link-login" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="link-password">Пароль</Label>
                              <Input id="link-password" type="password" />
                            </div>
                          </div>
                          <Button>Привязать аккаунт</Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("sape")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("sape") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle>Подключение рекламы SAPE</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("sape") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sape-code">Код SAPE</Label>
                        <Input id="sape-code" placeholder="Введите код SAPE" />
                        <p className="text-xs text-muted-foreground">
                          Для отображения ссылок добавьте метки &lt;!--sape_links(n)--&gt; в код шаблона
                        </p>
                      </div>
                      <Button>Сохранить</Button>
                    </CardContent>
                  )}
                </Card>

                <Card className="border-destructive">
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection("delete")}
                  >
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={expandedSections.includes("delete") ? "ChevronDown" : "ChevronRight"} 
                        size={20} 
                      />
                      <CardTitle className="text-destructive">Удаление сайта</CardTitle>
                    </div>
                  </CardHeader>
                  {expandedSections.includes("delete") && (
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="delete-password">Текущий пароль</Label>
                        <Input id="delete-password" type="password" />
                        <p className="text-sm text-destructive font-medium">
                          ⚠️ Внимание! Сайт удаляется полностью без возможности восстановления!
                        </p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Действительно удалить сайт? Восстановление будет невозможно!")) {
                            toast({
                              title: "Удаление отменено",
                              description: "Это демо-версия, удаление недоступно",
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

              <TabsContent value="administrators" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Администраторы сайта</CardTitle>
                    <CardDescription>Управление доступом администраторов к панели управления</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">admin@example.com</p>
                          <p className="text-sm text-muted-foreground">Полный доступ</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Добавить администратора</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Email администратора" type="email" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Уровень доступа" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Полный доступ</SelectItem>
                            <SelectItem value="orders">Только заказы</SelectItem>
                            <SelectItem value="products">Только товары</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button>Добавить администратора</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления по SMS</CardTitle>
                    <CardDescription>Настройка SMS-уведомлений для заказов и событий</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Уведомлять по SMS о:</Label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Новых заказах</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Изменении статуса заказа</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Новых сообщениях от клиентов</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sms-phone">Номер для SMS</Label>
                      <Input id="sms-phone" value="+79001234567" />
                    </div>

                    <Button>Сохранить</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="telegram" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления в Telegram</CardTitle>
                    <CardDescription>Получайте уведомления через Telegram-бот</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                      <p className="font-medium mb-2">Как подключить:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Найдите бот @myshop_bot в Telegram</li>
                        <li>Отправьте команду /start</li>
                        <li>Введите код подтверждения: <strong>ABC123</strong></li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <Label>Уведомлять в Telegram о:</Label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Новых заказах</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Новых сообщениях</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Важных событиях на сайте</span>
                        </label>
                      </div>
                    </div>

                    <Button>Сохранить</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emails" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления по е-мейл</CardTitle>
                    <CardDescription>Настройка email-уведомлений для администраторов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notification-email">Email для уведомлений</Label>
                      <Input id="notification-email" type="email" defaultValue="admin@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label>Уведомлять по email о:</Label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Новых заказах</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Изменении статуса заказа</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Новых отзывах</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Регистрации новых клиентов</span>
                        </label>
                      </div>
                    </div>

                    <Button>Сохранить</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="senders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Отправители е-мейл</CardTitle>
                    <CardDescription>Настройка адресов отправки email-сообщений</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sender-name">Имя отправителя</Label>
                      <Input id="sender-name" defaultValue="Мой Магазин" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sender-email">Email отправителя</Label>
                      <Input id="sender-email" type="email" defaultValue="noreply@myshop.ru" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reply-email">Email для ответов</Label>
                      <Input id="reply-email" type="email" defaultValue="support@myshop.ru" />
                    </div>

                    <Button>Сохранить</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="copy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Копирование данных на другие аккаунты</CardTitle>
                    <CardDescription>Перенос товаров и настроек между магазинами</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Что копировать:</Label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Товары</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Категории</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Настройки дизайна</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span>Страницы</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target-account">Целевой аккаунт</Label>
                      <Select>
                        <SelectTrigger id="target-account">
                          <SelectValue placeholder="Выберите аккаунт" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shop1">shop1.ru</SelectItem>
                          <SelectItem value="shop2">shop2.ru</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button>Начать копирование</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backups" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Резервные копии</CardTitle>
                    <CardDescription>Создание и восстановление резервных копий данных</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Автоматическое резервное копирование</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disabled">Отключено</SelectItem>
                          <SelectItem value="daily">Ежедневно</SelectItem>
                          <SelectItem value="weekly">Еженедельно</SelectItem>
                          <SelectItem value="monthly">Ежемесячно</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Доступные копии</h3>
                      <div className="space-y-2">
                        {[
                          { date: "2024-09-30 10:00", size: "15.2 MB" },
                          { date: "2024-09-29 10:00", size: "14.8 MB" },
                          { date: "2024-09-28 10:00", size: "14.5 MB" }
                        ].map((backup, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{backup.date}</p>
                              <p className="text-sm text-muted-foreground">{backup.size}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Icon name="Download" size={16} className="mr-1" />
                                Скачать
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="RotateCcw" size={16} className="mr-1" />
                                Восстановить
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать копию сейчас
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;