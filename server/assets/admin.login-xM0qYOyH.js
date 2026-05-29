import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { B as Button, s as supabase } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { Lock, AlertCircle, LogIn } from "lucide-react";
import { T as ThemeToggle } from "./theme-toggle-CARAU6uN.js";
import "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      console.log("Attempting login for:", email);
      const {
        data,
        error: authError
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (authError) {
        console.error("Supabase Auth Error:", authError);
        throw authError;
      }
      if (!data.user) throw new Error("Login failed");
      console.log("Login successful, checking admin role for user:", data.user.id);
      const {
        data: roleRow,
        error: roleError
      } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
      if (roleError) {
        console.error("Role Check Error:", roleError);
        throw roleError;
      }
      if (!roleRow) {
        console.warn("User is not an admin");
        await supabase.auth.signOut();
        setError("ليس لديك صلاحية الدخول إلى لوحة الإدارة. يرجى التأكد من أن حسابك لديه صلاحيات المسؤول.");
        return;
      }
      navigate({
        to: "/admin"
      });
    } catch (err) {
      console.error("Login process failed:", err);
      let message = "فشل تسجيل الدخول";
      if (err.message === "Invalid login credentials") {
        message = "بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور. إذا لم يكن لديك حساب، يرجى التسجيل أولاً.";
      } else if (err.message === "Email not confirmed") {
        message = "يرجى تأكيد بريدك الإلكتروني من خلال الرابط المرسل إليك قبل تسجيل الدخول.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative overflow-hidden", dir: "rtl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 z-50", children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center relative z-10 px-4", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-8 space-y-6 shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Lock, { className: "w-8 h-8 text-primary-foreground" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "لوحة التحكم" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "تسجيل دخول المسؤول الآمن" })
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "bg-destructive/10 border border-destructive/40 rounded-xl p-4 flex gap-3", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-destructive shrink-0" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold block", children: "البريد الإلكتروني" }),
          /* @__PURE__ */ jsx(Input, { type: "email", required: true, disabled: loading, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@Kusuf.tn", className: "h-12" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold block", children: "كلمة المرور" }),
          /* @__PURE__ */ jsx(Input, { type: "password", required: true, disabled: loading, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", className: "h-12" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full h-12", children: [
          /* @__PURE__ */ jsx(LogIn, { className: "w-4 h-4 ml-2" }),
          loading ? "جاري التحقق..." : "دخول آمن"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "ليس لديك حساب مسؤول؟",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => navigate({
          to: "/register"
        }), className: "text-primary font-semibold hover:underline", children: "سجل هنا" })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground border-t border-border pt-4", children: "هذه المنطقة مخصصة للمسؤولين فقط" })
    ] }) }) })
  ] });
}
export {
  AdminLogin as component
};
