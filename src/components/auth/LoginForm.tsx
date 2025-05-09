import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void;
  isLoading: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder="example@mail.ru"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Пароль</Label>
          <Link
            to="/forgot-password"
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            Забыли пароль?
          </Link>
        </div>
        <Input
          id="login-password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember-me"
          name="rememberMe"
          checked={formData.rememberMe}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
          }
        />
        <Label htmlFor="remember-me" className="text-sm">
          Запомнить меня
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-russian-blue hover:bg-russian-blue/90"
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
  );
};

export default LoginForm;
