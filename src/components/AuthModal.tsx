import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (
    email: string,
    password: string,
    userType: "buyer" | "seller",
  ) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "login") {
      onLogin(formData.email, formData.password, userType);
    } else {
      // Register logic
      onLogin(formData.email, formData.password, userType);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[450px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold">
            {activeTab === "login" ? "Вход" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login" className="text-sm">
              Вход
            </TabsTrigger>
            <TabsTrigger value="register" className="text-sm">
              Регистрация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-3">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  className="h-9"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-9"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Тип аккаунта</Label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="buyer"
                      checked={userType === "buyer"}
                      onCheckedChange={() => setUserType("buyer")}
                    />
                    <Label
                      htmlFor="buyer"
                      className="flex items-center cursor-pointer text-sm"
                    >
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Покупатель
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="seller"
                      checked={userType === "seller"}
                      onCheckedChange={() => setUserType("seller")}
                    />
                    <Label
                      htmlFor="seller"
                      className="flex items-center cursor-pointer text-sm"
                    >
                      <Icon name="Store" size={14} className="mr-1" />
                      Продавец
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 h-9 text-sm mt-4"
              >
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-3">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="reg-name" className="text-sm">
                    Имя
                  </Label>
                  <Input
                    id="reg-name"
                    placeholder="Ваше имя"
                    className="h-9"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="reg-phone" className="text-sm">
                    Телефон
                  </Label>
                  <Input
                    id="reg-phone"
                    placeholder="+7 (999) 123-45-67"
                    className="h-9"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="user@example.com"
                  className="h-9"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="reg-password" className="text-sm">
                    Пароль
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="h-9"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="reg-confirm" className="text-sm">
                    Подтвердить
                  </Label>
                  <Input
                    id="reg-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="h-9"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Тип аккаунта</Label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-buyer"
                      checked={userType === "buyer"}
                      onCheckedChange={() => setUserType("buyer")}
                    />
                    <Label
                      htmlFor="reg-buyer"
                      className="flex items-center cursor-pointer text-sm"
                    >
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Покупатель
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-seller"
                      checked={userType === "seller"}
                      onCheckedChange={() => setUserType("seller")}
                    />
                    <Label
                      htmlFor="reg-seller"
                      className="flex items-center cursor-pointer text-sm"
                    >
                      <Icon name="Store" size={14} className="mr-1" />
                      Продавец
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 h-9 text-sm mt-4"
              >
                Зарегистрироваться
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
