import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-pink-800 to-rose-800 text-white shadow-lg z-50">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Icon name="Menu" size={24} />
          </Button>

          <div className="flex items-center gap-2 text-pink-100">
            <Icon name="Package" size={20} />
            <span className="text-sm">Новых заказов пока нет</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-pink-100">Магазин</span>
          <a
            href="https://balooirk.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-pink-200 transition-colors"
          >
            balooirk.ru
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-pink-100">на счету:</span>
            <a href="#" className="text-cyan-300 hover:text-cyan-200 font-semibold">
              42 руб
            </a>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white ml-2"
            >
              пополнить
            </Button>
          </div>

          <a
            href="/login"
            className="text-pink-100 hover:text-white text-sm transition-colors flex items-center gap-2"
          >
            Выход
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;