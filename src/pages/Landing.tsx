import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    email: "",
    agreement: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Создание магазина:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="text-2xl font-bold text-primary">
                🛍️ AllTrades
              </a>
              <ul className="hidden md:flex items-center gap-6">
                <li><a href="#" className="hover:text-primary transition-colors">Главная</a></li>
                <li className="relative group">
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                    Платформа
                    <Icon name="ChevronDown" size={16} />
                  </a>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <ul className="py-2">
                      <li><a href="#" className="block px-4 py-2 hover:bg-accent">Возможности</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-accent">Модули и интеграции</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-accent">Примеры магазинов</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-accent">Видео-уроки</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-accent">Пошаговая инструкция</a></li>
                    </ul>
                  </div>
                </li>
                <li><a href="#rates" className="hover:text-primary transition-colors">Тарифы</a></li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <a href="#create-account" className="hidden md:block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Создать магазин
              </a>
              <a href="/login" className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                Вход
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Создай свой интернет-магазин за минуты и зарабатывай долгие годы
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Платформа для создания и продвижения интернет-магазинов
                </p>
              </div>

              <Card className="relative overflow-hidden" id="create-account">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-12 -mb-12" />
                <CardContent className="p-8 relative z-10">
                  <h2 className="text-2xl font-bold mb-6">Создание магазина</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Придумайте логин"
                      value={formData.login}
                      onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                    />
                    <Input
                      type="password"
                      placeholder="Пароль"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Input
                      type="email"
                      placeholder="Ваш e-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Button className="w-full" size="lg">
                      Создать магазин
                    </Button>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="agreement"
                        checked={formData.agreement}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreement: checked as boolean })}
                      />
                      <label htmlFor="agreement" className="text-sm text-muted-foreground leading-tight">
                        Я ознакомлен и согласен с{" "}
                        <a href="#" className="text-primary hover:underline">Пользовательским соглашением</a>
                        {" "}и{" "}
                        <a href="#" className="text-primary hover:underline">Политикой конфиденциальности</a>
                      </label>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-4">Всё для работы профессионального магазина</h2>
            <div className="text-center text-muted-foreground mb-12">
              <p>Создание интернет-магазина бесплатно</p>
              <p>Месячная подписка по цене среднего чека в продуктовом магазине</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "Video", title: "Видеоуроки и обзоры" },
                { icon: "BookOpen", title: "Пошаговое руководство и инструкции" },
                { icon: "Puzzle", title: "Каталог подключаемых модулей" },
                { icon: "Palette", title: "Десятки профессиональных шаблонов" }
              ].map((item, idx) => (
                <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </Card>
              ))}
            </div>

            <div className="mt-20">
              <h2 className="text-4xl font-bold text-center mb-4">Покажите ваши товары миллионам людей</h2>
              <p className="text-center text-muted-foreground mb-12">
                Интернет-магазин позволяет выставлять товары на крупнейшие площадки
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {["Яндекс.Маркет", "Ozon", "Wildberries", "AliExpress", "VK", "OK", "Telegram"].map((platform, idx) => (
                  <Card key={idx} className="p-6 flex items-center justify-center hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-center">{platform}</h3>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-accent/30">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-12">Возможности системы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "Truck",
                  title: "Службы доставки и выдачи товаров",
                  description: "подключайтесь к ведущим службам доставки. Система автоматически рассчитает стоимость доставки и включит её в счёт."
                },
                {
                  icon: "Sparkles",
                  title: "Профессиональное оформление",
                  description: "выбирайте оформление, чтобы магазин соответствовал желаемому стилю."
                },
                {
                  icon: "CreditCard",
                  title: "Способы оплаты заказов",
                  description: "получайте оплату с помощью банковских карт, электронных денег или наличными."
                },
                {
                  icon: "Globe",
                  title: "Размещение товаров в Google",
                  description: "используйте функцию размещения и продвижения ваших товаров в крупных социальных сетях и поисковых системах."
                },
                {
                  icon: "ShoppingBag",
                  title: "Размещение товаров на маркетплейсах",
                  description: "всё настроено для того, чтобы ваши товары можно было легко выгружать на Яндекс.Маркет, Ozon и другие площадки"
                },
                {
                  icon: "MessageCircle",
                  title: "Магазин в Telegram",
                  description: "продавайте в самом быстрорастущем мессенджере"
                },
                {
                  icon: "Share2",
                  title: "Размещение товаров в соцсетях VK и OK",
                  description: "выгружайте ваши товары во ВКонтакте и в Одноклассники и получайте больше покупателей"
                },
                {
                  icon: "Smartphone",
                  title: "Мобильное приложение для управления заказами",
                  description: "контролируйте работу магазина с помощью мобильного телефона, где бы вы ни находились."
                },
                {
                  icon: "Languages",
                  title: "Мультиязычность",
                  description: "отображение магазина на любом языке, чтобы вашей аудиторией была не только Россия, но и весь мир."
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-12">Простая арифметика</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Средний чек в магазине:</span>
                    <span className="font-semibold">5 000 руб. / заказ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Реклама:</span>
                    <span className="font-semibold">700 руб. / заказ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Закупка:</span>
                    <span className="font-semibold">2500 руб. / заказ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Доставка:</span>
                    <span className="font-semibold">250 руб. / заказ</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Налоги (упрощенная система):</span>
                    <span className="font-semibold">300 руб. / заказ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Прибыль от 1 заказа:</span>
                    <span className="font-semibold">1250 руб. / заказ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Количество заказов:</span>
                    <span className="font-semibold">10 заказов / день</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Прибыль в день:</span>
                    <span className="font-bold text-primary">12 500 руб. / день</span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">
                12 500 × 30 = <span className="text-primary">375 000 руб. / мес.</span>
              </p>
              <p className="text-xl text-muted-foreground">С одного интернет-магазина!</p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-accent/30" id="rates">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-4">Тарифы</h2>
            <p className="text-center text-muted-foreground mb-12">При оплате за год</p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-blue-500">
                <div className="bg-blue-500 text-white text-center py-2 px-4 rounded-lg mb-6">
                  <h3 className="font-bold">Базовый</h3>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Все функции магазина без ограничений
                  </p>
                  <p className="text-sm text-muted-foreground">
                    До <span className="font-semibold">1 000</span> товаров в каталоге.
                  </p>
                </div>
                <p className="text-3xl font-bold text-center mb-6">1 020 руб/мес.</p>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-green-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Популярный
                </div>
                <div className="bg-green-500 text-white text-center py-2 px-4 rounded-lg mb-6">
                  <h3 className="font-bold">Бизнес</h3>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Все функции магазина без ограничений.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    До <span className="font-semibold">10 000</span> товаров в каталоге.
                  </p>
                </div>
                <p className="text-3xl font-bold text-center mb-6">1 620 руб/мес.</p>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-purple-500">
                <div className="bg-purple-500 text-white text-center py-2 px-4 rounded-lg mb-6">
                  <h3 className="font-bold">Безлимит</h3>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Все функции магазина без ограничений.
                  </p>
                  <p className="text-sm">
                    Количество товаров <span className="font-semibold text-purple-500">не ограничено.</span>
                  </p>
                </div>
                <p className="text-3xl font-bold text-center mb-6">2 370 руб/мес.</p>
              </Card>
            </div>
            <p className="text-center text-muted-foreground mb-6">
              При оплате за несколько месяцев действуют скидки. Отмена в любое время.
            </p>
            <div className="text-center">
              <a href="#create-account" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold">
                Создать магазин
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-accent/50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">AllTrades</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Профессиональный сервис по созданию и продвижению интернет-магазинов.
              </p>
              <p className="text-sm text-muted-foreground">© 2007-2024 «AllTrades»</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Информация</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">О компании</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Контакты</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Пользовательское соглашение</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Политика конфиденциальности</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Наши новости</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@alltrades.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  @AlltradesSupport
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Зеленоград
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Мы в соцсетях:</p>
                <div className="flex gap-2">
                  {["Facebook", "Twitter", "Instagram", "Youtube"].map((social, idx) => (
                    <a key={idx} href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Icon name="Share2" size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Для смартфона</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Приложение для управления магазином:
              </p>
              <div className="space-y-2">
                <a href="#" className="block">
                  <div className="border rounded-lg p-2 hover:shadow transition-shadow">
                    <Icon name="Smartphone" size={20} />
                    <span className="text-xs ml-2">Google Play</span>
                  </div>
                </a>
                <a href="#" className="block">
                  <div className="border rounded-lg p-2 hover:shadow transition-shadow">
                    <Icon name="Smartphone" size={20} />
                    <span className="text-xs ml-2">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="#top"
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Icon name="ArrowUp" size={24} />
      </a>
    </div>
  );
};

export default Landing;