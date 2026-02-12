"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/toast";
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(50, "Имя не должно превышать 50 символов"),
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(100, "Пароль не должен превышать 100 символов")
      .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
      .regex(/[a-zA-Zа-яА-Я]/, "Пароль должен содержать хотя бы одну букву"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 409) {
          setError("email", { message: result.error });
        } else if (result.details) {
          for (const detail of result.details) {
            if (detail.field) {
              setError(detail.field as keyof RegisterFormValues, {
                message: detail.message,
              });
            }
          }
        } else {
          toast(result.error || "Ошибка регистрации", "error");
        }
        return;
      }

      toast("Регистрация прошла успешно! Теперь войдите в систему.", "success");
      router.push("/login");
    } catch {
      toast("Ошибка сети. Попробуйте позже.", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              Регистрация
            </span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Создайте аккаунт для доступа к платформе
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Новый аккаунт
            </CardTitle>
            <CardDescription>
              Заполните форму ниже. Все поля обязательны.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Имя
                </Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Пароль
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Минимум 6 символов"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-1"
                >
                  <Lock className="h-4 w-4" />
                  Подтвердите пароль
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Повторите пароль"
                    {...register("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Войти
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
