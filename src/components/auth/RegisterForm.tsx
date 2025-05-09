import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  isLoading: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
        <Label htmlFor="register-name">Имя</Label>
        <Input
          id="register-name"
          name="name"
          placeholder="Иван Иванов"
          required
          value={formData.name}
          onChange={handleChange}
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
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Пароль</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-confirm-password">Подтверждение пароля</Label>
        <Input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="agree-terms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              agreeToTerms: checked as boolean,
            }))
          }
        />
        <Label htmlFor="agree-terms" className="text-sm">
          Я согласен с{" "}
          <a href="#" className="text-purple-600 hover:underline">
            политикой конфиденциальности
          </a>{" "}
          и{" "}
          <a href="#" className="text-purple-600 hover:underline">
            пользовательским соглашением
          </a>
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
            Регистрация...
          </>
        ) : (
          "Зарегистрироваться"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
