
import { LoginFormData } from '@/components/auth/LoginForm';
import { RegisterFormData } from '@/components/auth/RegisterForm';

// Тип для ответа из сервиса авторизации
interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

// Имитация задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Сервис авторизации с методами для входа и регистрации
export const authService = {
  // Вход пользователя
  login: async (formData: LoginFormData): Promise<AuthResponse> => {
    // Имитация запроса к серверу
    await delay(1000);
    
    try {
      // Получаем данные из localStorage (в реальном приложении - запрос к API)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === formData.email);
      
      if (user && user.password === formData.password) {
        // Создаем объект с данными пользователя для хранения в текущей сессии
        const currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          isLoggedIn: true
        };
        
        // Сохраняем в localStorage (в реальном приложении - в cookies/localStorage + JWT)
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        return {
          success: true,
          user: currentUser
        };
      }
      
      return {
        success: false,
        message: "Неверный email или пароль"
      };
    } catch (error) {
      console.error("Ошибка при входе:", error);
      return {
        success: false,
        message: "Произошла ошибка при входе в систему"
      };
    }
  },
  
  // Регистрация пользователя
  register: async (formData: RegisterFormData): Promise<AuthResponse> => {
    // Имитация запроса к серверу
    await delay(1000);
    
    try {
      // Проверяем, что пароли совпадают
      if (formData.password !== formData.confirmPassword) {
        return {
          success: false,
          message: "Пароли не совпадают"
        };
      }
      
      // Проверяем согласие с условиями
      if (!formData.agreeToTerms) {
        return {
          success: false,
          message: "Необходимо согласие с условиями пользовательского соглашения"
        };
      }
      
      // Получаем текущих пользователей
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Проверяем, не существует ли уже такой email
      const userExists = users.some((u: any) => u.email === formData.email);
      if (userExists) {
        return {
          success: false,
          message: "Пользователь с таким email уже существует"
        };
      }
      
      // Создаем нового пользователя
      const newUser = {
        id: Date.now(), // Простой способ генерации ID
        name: formData.name,
        email: formData.email,
        password: formData.password, // В реальном приложении должен быть хэширован
        orders: [],
        designs: []
      };
      
      // Сохраняем пользователя в "базу данных"
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Создаем объект с данными пользователя для авторизации
      const currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isLoggedIn: true
      };
      
      // Авторизуем пользователя
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      return {
        success: true,
        user: currentUser
      };
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      return {
        success: false,
        message: "Произошла ошибка при регистрации"
      };
    }
  }
};
