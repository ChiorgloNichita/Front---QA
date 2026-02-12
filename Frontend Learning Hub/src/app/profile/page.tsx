"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/toast";
import { User, Mail, Calendar, LogOut, Trash2, Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result.data);
        } else {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    toast("Вы вышли из системы", "success");
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Вы уверены, что хотите удалить аккаунт? Это действие необратимо.")) {
      return;
    }

    const token = localStorage.getItem("auth_token");
    if (token) {
      const res = await fetch("/api/auth/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        toast("Аккаунт удалён", "success");
        router.push("/register");
        return;
      }
    }
    toast("Ошибка удаления аккаунта", "error");
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Профиль
            </span>
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              {user.name}
            </CardTitle>
            <CardDescription>Информация о вашем аккаунте</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Имя</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Дата регистрации</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить аккаунт
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
