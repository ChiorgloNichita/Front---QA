"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/toast";
import { Mail, MessageSquare, User, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов"),
  email: z.string().email("Введите корректный email"),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(1000, "Сообщение не должно превышать 1000 символов"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast(result.error || "Ошибка при отправке", "error");
        return;
      }

      toast("Сообщение успешно отправлено!", "success");
      setSubmitted(true);
      reset();
    } catch {
      toast("Ошибка сети. Попробуйте позже.", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold md:text-4xl"><span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Контакты</span></h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Есть вопрос или предложение? Напишите нам!
          </p>
        </div>

        {submitted ? (
          <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-600 dark:text-green-400" />
              <h2 className="mb-2 text-2xl font-bold">Сообщение отправлено!</h2>
              <p className="mb-6 text-muted-foreground">
                Спасибо за обращение. Это учебный проект, поэтому ответ не будет
                отправлен, но форма работает корректно.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Отправить ещё
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Форма обратной связи</CardTitle>
              <CardDescription>
                Заполните форму ниже. Все поля обязательны.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
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
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Сообщение
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Ваше сообщение..."
                    rows={5}
                    {...register("message")}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Contact info */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "hello@flhub.example",
            },
            {
              icon: MessageSquare,
              title: "Чат",
              value: "Доступен 24/7",
            },
            {
              icon: User,
              title: "Автор",
              value: "Frontend Developer",
            },
          ].map((item) => (
            <Card key={item.title} className="text-center">
              <CardContent className="pt-6">
                <item.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
