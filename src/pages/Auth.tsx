
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Форма входа
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Форма регистрации
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // Обработчики изменения полей
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Обработка входа
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация запроса к серверу
    setTimeout(() => {
      // Проверка данных (в реальном приложении это делается на сервере)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === loginForm.email);
      
      if (user && user.password === loginForm.password) {
        // Успешный вход
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          isLoggedIn: true
        }));
        
        toast({
          title: "Вход выполнен успешно",
          description: `Добро пожаловать, ${user.name}!`,
        });
        
        navigate('/account');
      } else {
        // Ошибка входа
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Обработка регистрации
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!registerForm.agreeToTerms) {
      toast({
        title: "Необходимо согласие",
        description: "Пожалуйста, примите условия пользовательского соглашения",
        variant: "destructive"
      });
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Ошибка валидации",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Имитация запроса к серверу
    setTimeout(() => {
      // Проверка, не существует ли уже пользователь с таким email
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => u.email === registerForm.email);
      
      if (userExists) {
        toast({
          title: "Ошибка регистрации",
          description: "Пользователь с таким email уже существует",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Создание нового пользователя
      const newUser = {
        id: Date.now(), // Простой способ генерации уникального ID
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password, // В реальном приложении пароль должен быть захеширован
        orders: [],
        designs: []
      };
      
      // Сохранение в localStorage (в реальном приложении - в базе данных)
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Автоматический вход после регистрации
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isLoggedIn: true
      }));
      
      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в Эмбротеку!",
      });
      
      navigate('/account');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Вход в личный кабинет</CardTitle>
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
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="example@mail.ru"
                      required
                      value={loginForm.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Пароль</Label>
                      <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                        Забыли пароль?
                      </Link>
                    </div>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      name="rememberMe"
                      checked={loginForm.rememberMe}
                      onCheckedChange={(checked) => 
                        setLoginForm(prev => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="remember-me" className="text-sm">Запомнить меня</Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">◯</span>
                        Выполняется вход...
                      </>
                    ) : (
                      "Войти"
                    )}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-2 text-gray-500">или</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" type="button">
                      <Icon name="Mail" className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button variant="outline" className="w-full" type="button">
                      <Icon name="Github" className="mr-2 h-4 w-4" />
                      ВКонтакте
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              {/* Вкладка регистрации */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Имя</Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="Иван Иванов"
                      required
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="example@mail.ru"
                      required
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Подтверждение пароля</Label>
                    <Input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agree-terms" 
                      name="agreeToTerms"
                      checked={registerForm.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setRegisterForm(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agree-terms" className="text-sm">
                      Я согласен с <a href="#" className="text-purple-600 hover:underline">политикой конфиденциальности</a> и <a href="#" className="text-purple-600 hover:underline">пользовательским соглашением</a>
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">◯</span>
                        Регистрация...
                      </>
                    ) : (
                      "Зарегистрироваться"
                    )}
                  </Button>
                </form>
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
