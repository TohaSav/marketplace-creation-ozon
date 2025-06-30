import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [inn, setInn] = useState("");
  const [ogrn, setOgrn] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [corrAccount, setCorrAccount] = useState("");
  const [bik, setBik] = useState("");
  const [kpp, setKpp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      // Регистрация продавца - проверяем обязательные поля
      if (
        name &&
        email &&
        password &&
        inn &&
        ogrn &&
        accountNumber &&
        corrAccount &&
        bik
      ) {
        const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
        const existingSeller = sellers.find((s: any) => s.email === email);

        if (existingSeller) {
          toast({
            title: "Ошибка регистрации",
            description: "Пользователь с таким email уже существует",
            variant: "destructive",
          });
        } else {
          const newSeller = {
            id: Date.now(),
            name,
            email,
            password,
            inn,
            ogrn,
            accountNumber,
            corrAccount,
            bik,
            kpp,
            createdAt: new Date().toISOString(),
            products: [],
            earnings: 0,
          };

          sellers.push(newSeller);
          localStorage.setItem("sellers", JSON.stringify(sellers));
          localStorage.setItem("seller-token", JSON.stringify(newSeller));

          toast({
            title: "Регистрация успешна",
            description: "Добро пожаловать в кабинет продавца",
          });
          navigate("/seller/dashboard");
        }
      } else {
        toast({
          title: "Ошибка регистрации",
          description:
            "Заполните все обязательные поля: имя, email, пароль, ИНН, ОГРН, расчётный счёт, корреспондентский счёт и БИК",
          variant: "destructive",
        });
      }
    } else {
      // Вход продавца
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
      const seller = sellers.find(
        (s: any) => s.email === email && s.password === password,
      );

      if (seller) {
        localStorage.setItem("seller-token", JSON.stringify(seller));
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в кабинет продавца",
        });
        navigate("/seller/dashboard");
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный логин или пароль",
          variant: "destructive",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Icon name="Store" size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegister ? "Регистрация продавца" : "Кабинет продавца"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isRegister
              ? "Создайте аккаунт продавца"
              : "Войдите в свой кабинет"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {isRegister && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя/Название магазина{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Icon
                      name="User"
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="Введите имя или название магазина"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ИНН <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Icon
                      name="FileText"
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={inn}
                      onChange={(e) => setInn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="10 или 12 цифр"
                      pattern="[0-9]{10,12}"
                      maxLength={12}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ОГРН <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Icon
                      name="Hash"
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={ogrn}
                      onChange={(e) => setOgrn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="13 или 15 цифр"
                      pattern="[0-9]{13,15}"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    КПП
                  </label>
                  <div className="relative">
                    <Icon
                      name="Key"
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={kpp}
                      onChange={(e) => setKpp(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="9 цифр"
                      pattern="[0-9]{9}"
                      maxLength={9}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Банковские реквизиты
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Расчётный счёт <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Icon
                        name="CreditCard"
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-mono"
                        placeholder="20 цифр"
                        pattern="[0-9]{20}"
                        maxLength={20}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Корреспондентский счёт{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Icon
                        name="Building"
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        value={corrAccount}
                        onChange={(e) => setCorrAccount(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-mono"
                        placeholder="20 цифр"
                        pattern="[0-9]{20}"
                        maxLength={20}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    БИК <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Icon
                      name="Banknote"
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={bik}
                      onChange={(e) => setBik(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-mono"
                      placeholder="9 цифр"
                      pattern="[0-9]{9}"
                      maxLength={9}
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Icon
                  name="Mail"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="seller@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Icon
                  name="Lock"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isRegister ? "Регистрация..." : "Вход..."}
              </>
            ) : (
              <>{isRegister ? "Зарегистрироваться" : "Войти в кабинет"}</>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            {isRegister
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Для продавцов и предпринимателей
        </div>
      </div>
    </div>
  );
}
