import { useState } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  items: { label: string; href: string }[];
}

const menuData: MenuItem[] = [
  {
    id: "main",
    icon: "Home",
    title: "Главная",
    items: [
      { label: "Общие настройки", href: "/settings" },
      { label: "Страницы сайта", href: "#" },
      { label: "Меню сайта", href: "#" },
      { label: "Файлы", href: "#" },
    ],
  },
  {
    id: "design",
    icon: "Palette",
    title: "Дизайн сайта",
    items: [
      { label: "Варианты оформления", href: "#" },
      { label: "Изображения", href: "#" },
      { label: "Шаблоны сайта", href: "#" },
      { label: "Визуальный редактор", href: "#" },
    ],
  },
  {
    id: "shop",
    icon: "ShoppingCart",
    title: "Мой магазин",
    items: [
      { label: "Разделы каталога", href: "#" },
      { label: "Товары", href: "/products" },
      { label: "Заказы", href: "/orders" },
      { label: "Импорт/Экспорт", href: "#" },
      { label: "Настройки магазина", href: "#" },
    ],
  },
  {
    id: "crm",
    icon: "Users",
    title: "CRM",
    items: [
      { label: "Клиенты", href: "/customers" },
      { label: "Аналитика", href: "/analytics" },
      { label: "Email-рассылки", href: "/email-campaigns" },
    ],
  },
  {
    id: "modules",
    icon: "Grid3x3",
    title: "Доп. модули",
    items: [
      { label: "Лента новостей", href: "#" },
      { label: "Каталог статей", href: "#" },
      { label: "Поиск", href: "#" },
      { label: "Формы обратной связи", href: "#" },
      { label: "Пользователи", href: "#" },
      { label: "Опросы", href: "#" },
      { label: "Фотогалерея", href: "#" },
      { label: "Онлайн-консультант", href: "#" },
    ],
  },
  {
    id: "promo",
    icon: "TrendingUp",
    title: "Реклама",
    items: [
      { label: "Соцсети", href: "#" },
      { label: "Маркетплейсы", href: "#" },
      { label: "E-mail рассылки", href: "#" },
      { label: "Заказать рекламу", href: "#" },
    ],
  },
  {
    id: "help",
    icon: "HelpCircle",
    title: "Помощь",
    items: [
      { label: "Техподдержка", href: "#" },
      { label: "Отдел доработки", href: "#" },
      { label: "Справка", href: "#" },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>(["main"]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-pink-900 to-rose-900 text-pink-50 overflow-y-auto transition-all duration-300 shadow-2xl",
        isCollapsed ? "w-0" : "w-64"
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-4xl">🛍️</span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuData.map((menu) => (
            <div key={menu.id} className="mb-1">
              <button
                onClick={() => toggleMenu(menu.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon name={menu.icon} size={20} className="text-pink-300 group-hover:text-pink-100" />
                  <span className="font-medium">{menu.title}</span>
                </div>
                <Icon
                  name="ChevronRight"
                  size={18}
                  className={cn(
                    "transition-transform text-pink-300",
                    openMenus.includes(menu.id) && "rotate-90"
                  )}
                />
              </button>

              {openMenus.includes(menu.id) && (
                <div className="ml-4 mt-1 space-y-1 animate-accordion-down">
                  {menu.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="block py-2 px-4 text-sm text-pink-200 hover:text-white hover:bg-white/5 rounded transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg space-y-2 text-sm">
          <p className="font-semibold text-pink-100">Информация</p>
          <p className="text-pink-200">Всего заказов: <b>1</b></p>
          <p className="text-pink-200">Комментариев: <b>0</b></p>
          <p className="text-pink-200">На счету: <b>42 руб</b></p>
          <p className="text-red-300 font-bold mt-3">Тариф: 2100 руб/мес</p>
          <p className="text-red-300">Необходимо пополнить счет</p>
          <a href="#" className="inline-block mt-2 text-green-300 hover:text-green-200 font-medium">
            Пополнить счет
          </a>
          <div className="pt-3 mt-3 border-t border-white/20 flex items-center gap-2 text-green-300">
            <Icon name="Lock" size={16} />
            <span>Защищено SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;