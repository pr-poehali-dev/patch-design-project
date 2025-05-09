import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/data/products";
import LoginForm, { LoginFormData } from "@/components/auth/LoginForm";
import RegisterForm, { RegisterFormData } from "@/components/auth/RegisterForm";
import { authService } from "@/services/authService";

/**
 * Страница авторизации/регистрации пользователя
 */
const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Обработчик входа пользователя
   */
  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await authService.login(formData);

      if (response.success && response.user) {
        toast({
          title: "Вход выполнен успешно",
          description: `Добро пожаловать, ${response.user.name}!`,
        });

        navigate("/account");
      } else {
        toast({
          title: "Ошибка входа",
          description: response.message || "Неверный email или пароль",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
      toast({
        title: "Ошибка входа",
        description: "Произошла неожиданная ошибка. Попробуйте еще раз позже.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Обработчик регистрации пользователя
   */
  const handleRegister = async (formData: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await authService.register(formData);

      if (response.success && response.user) {
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в Эмбротеку!",
        });

        navigate("/account");
      } else {
        toast({
          title: "Ошибка регистрации",
          description: response.message || "Не удалось зарегистрироваться",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
      toast({
        title: "Ошибка регистрации",
        description: "Произошла неожиданная ошибка. Попробуйте еще раз позже.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Вход в личный кабинет
            </CardTitle>
            <CardDescription className="text-center">
              Войдите или зарегистрируйтесь для доступа к покупкам
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              {/* Вкладка входа */}
              <TabsContent value="login">
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              </TabsContent>

              {/* Вкладка регистрации */}
              <TabsContent value="register">
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Auth;
