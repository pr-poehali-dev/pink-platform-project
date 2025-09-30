import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Card className="w-full max-w-md p-8 shadow-2xl border-pink-200">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
            <span className="text-5xl">🛍️</span>
          </div>
          <h1 className="text-3xl font-bold text-pink-900 mb-2">Alltrades</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-900 mb-6">Вход в систему</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-pink-800 mb-2">
                Логин:
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                placeholder="Введите логин"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-800 mb-2">
                Пароль:
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                placeholder="Введите пароль"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8"
              >
                Войти
              </Button>
              <a 
                href="#" 
                className="text-sm text-pink-600 hover:text-pink-800 transition-colors"
              >
                Забыли пароль?
              </a>
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pink-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-pink-600">или</span>
            </div>
          </div>

          <div className="text-center">
            <Button 
              type="button" 
              variant="outline"
              className="border-pink-300 text-pink-700 hover:bg-pink-50 hover:border-pink-400"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              Войти через Telegram
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;