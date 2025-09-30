import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

interface DashboardItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const dashboardItems: DashboardItem[] = [
  {
    icon: "Settings",
    title: "Общие настройки",
    description: "Общие настройки сайта: смена пароля, перенос на отдельный домен, настройки панели управления и т.д.",
    href: "#",
  },
  {
    icon: "Grid3x3",
    title: "Модули сайта",
    description: "Подключение отдельных модулей для сайта - интернет-магазин, лента новостей, каталог статей, форма обратной связи и т.д.",
    href: "#",
  },
  {
    icon: "FileText",
    title: "Страницы сайта",
    description: "Управление страницами сайта. Здесь можно добавить новые страницы и отредактировать уже имеющиеся на сайте.",
    href: "#",
  },
  {
    icon: "Menu",
    title: "Меню сайта",
    description: "Управление меню сайта. Создание новых меню, управление пунктами меню, добавление в меню страниц и управление порядком их отображения.",
    href: "#",
  },
  {
    icon: "Files",
    title: "Файлы",
    description: "В этом разделе на сайт можно загрузить файлы для скачивания - прайс-листы, архивы, документы и любые другие.",
    href: "#",
  },
  {
    icon: "Database",
    title: "Резервные копии",
    description: "В этом разделе можно восстановить состояние сайта за несколько предыдущих дней. Сайт восстанавливается полностью вместе с настройками, страницами, товарами, заказами и т.д.",
    href: "#",
  },
  {
    icon: "MessageCircle",
    title: "Тех. поддержка",
    description: "Здесь вы можете задать вопрос технической поддержке. Для получения скорейшего ответа опишите проблему как можно более полно и точно.",
    href: "#",
  },
  {
    icon: "Palette",
    title: "Варианты оформления",
    description: "Здесь можно целиком поменять оформление сайта на один из встроенных вариантов. Товары, заказы, страницы и другая информация при этом не теряются.",
    href: "#",
  },
  {
    icon: "Code",
    title: "Шаблоны",
    description: "Здесь можно отредактировать внешний вид сайта. Редактировать можно либо при помощи визуального редактора, либо напрямую изменяя HTML-кода шаблона.",
    href: "#",
  },
  {
    icon: "Image",
    title: "Изображения",
    description: "Здесь можно загрузить на сайт изображения. Их можно использовать в качестве элементов дизайна или просто разместить на страницах сайта.",
    href: "#",
  },
  {
    icon: "CreditCard",
    title: "Пополнить счет",
    description: "Здесь вы можете пополнить счет.",
    href: "#",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      <Sidebar />
      
      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <div className="text-sm text-pink-600 mb-2">Главная</div>
          <h1 className="text-4xl font-bold text-pink-900 mb-2">
            Панель управления интернет-магазином
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <Card
              key={index}
              className="group p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-pink-200 bg-white/80 backdrop-blur-sm cursor-pointer"
            >
              <a href={item.href} className="block text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Icon name={item.icon} size={48} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-pink-900 mb-3 group-hover:text-pink-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-pink-700/80 leading-relaxed">
                  {item.description}
                </p>
              </a>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;