import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { u as useAuth, B as Button } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
import "./theme-toggle-CARAU6uN.js";
import "./notifications-bell-BYGZWSnU.js";
import "@radix-ui/react-popover";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate({
        to: "/account"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background", dir: "rtl", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 flex items-center justify-center px-4 pt-[100px] md:pt-[120px] pb-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md glass rounded-2xl shadow-2xl p-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center text-foreground mb-2", children: "تسجيل الدخول" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mb-6", children: "سجل الدخول إلى حساب Kusuf الخاص بك" }),
      /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "البريد الإلكتروني" }),
          /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your@email.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "كلمة المرور" }),
          /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••" })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full", children: loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-muted-foreground mt-6", children: [
        "ليس لديك حساب؟",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-primary font-medium hover:underline", children: "إنشاء حساب جديد" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  LoginPage as component
};
