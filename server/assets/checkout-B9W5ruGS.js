import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { b as useCart, u as useAuth, B as Button, s as supabase } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { T as Textarea } from "./textarea-BL7vV12y.js";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
import "./theme-toggle-CARAU6uN.js";
import "./notifications-bell-BYGZWSnU.js";
import "@radix-ui/react-popover";
function CheckoutPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    total,
    clearCart
  } = useCart();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    notes: ""
  });
  const shipping = total > 0 ? 7 : 0;
  const onChange = (k) => (e) => setForm((f) => ({
    ...f,
    [k]: e.target.value
  }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("سجل الدخول لإتمام الطلب");
      navigate({
        to: "/login"
      });
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.rpc("place_order", {
      _items: items.map((i) => ({
        id: i.id,
        quantity: i.quantity
      })),
      _shipping: form,
      _phone: form.phone,
      _shipping_fee: shipping
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    clearCart();
    setDone(true);
  };
  if (done) {
    return /* @__PURE__ */ jsxs("div", { dir: "rtl", className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 flex items-center justify-center px-4 pt-[100px] md:pt-[120px]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "شكراً لطلبك!" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "سنتواصل معك قريباً لتأكيد التوصيل." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-center", children: [
          /* @__PURE__ */ jsx(Link, { to: "/account", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "طلباتي" }) }),
          /* @__PURE__ */ jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsx(Button, { children: "متابعة التسوق" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { dir: "rtl", className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 flex items-center justify-center px-4 pt-[100px] md:pt-[120px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
        /* @__PURE__ */ jsx(ShoppingBag, { className: "w-16 h-16 mx-auto text-muted-foreground opacity-40" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "سلتك فارغة" }),
        /* @__PURE__ */ jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsx(Button, { children: "تصفح المنتجات" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { dir: "rtl", className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pt-[100px] md:pt-[120px] pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit, className: "md:col-span-2 bg-card p-8 rounded-2xl border border-border space-y-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "معلومات التوصيل" }),
        !user && /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 border border-border rounded-md p-3 text-sm", children: [
          /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary font-medium hover:underline", children: "سجل الدخول" }),
          " ",
          "لحفظ طلبك في حسابك."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Input, { placeholder: "الاسم الكامل", required: true, value: form.name, onChange: onChange("name") }),
          /* @__PURE__ */ jsx(Input, { type: "tel", placeholder: "رقم الهاتف", required: true, value: form.phone, onChange: onChange("phone") })
        ] }),
        /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "البريد الإلكتروني", required: true, value: form.email, onChange: onChange("email") }),
        /* @__PURE__ */ jsx(Input, { placeholder: "العنوان", required: true, value: form.address, onChange: onChange("address") }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Input, { placeholder: "المدينة", required: true, value: form.city, onChange: onChange("city") }),
          /* @__PURE__ */ jsx(Input, { placeholder: "الرمز البريدي", value: form.zip, onChange: onChange("zip") })
        ] }),
        /* @__PURE__ */ jsx(Textarea, { placeholder: "ملاحظات (اختياري)", rows: 3, value: form.notes, onChange: onChange("notes") }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: submitting, className: "w-full h-12 text-lg", children: submitting ? "جاري الإرسال..." : `تأكيد الطلب • ${(total + shipping).toFixed(2)} د.ت` }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground text-center", children: "الدفع عند الاستلام متاح في جميع المدن التونسية" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card p-6 rounded-2xl border border-border space-y-4 h-fit", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "طلبك" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-80 overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pb-3 border-b border-border last:border-0", children: [
          /* @__PURE__ */ jsx("img", { src: item.image, alt: item.name, className: "w-16 h-16 rounded-md object-cover bg-muted" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold line-clamp-2", children: item.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-primary font-bold mt-1", children: [
              item.price.toFixed(2),
              " د.ت"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateQuantity(item.id, item.quantity - 1), className: "p-1 rounded border border-border", children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" }) }),
              /* @__PURE__ */ jsx("span", { className: "w-6 text-center", children: item.quantity }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateQuantity(item.id, item.quantity + 1), className: "p-1 rounded border border-border", children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }) }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeFromCart(item.id), className: "p-1 mr-auto text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
            ] })
          ] })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-3 border-t border-border text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "المجموع الفرعي" }),
            /* @__PURE__ */ jsxs("span", { children: [
              total.toFixed(2),
              " د.ت"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "التوصيل" }),
            /* @__PURE__ */ jsxs("span", { children: [
              shipping.toFixed(2),
              " د.ت"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-lg pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsx("span", { children: "الإجمالي" }),
            /* @__PURE__ */ jsxs("span", { className: "text-primary", children: [
              (total + shipping).toFixed(2),
              " د.ت"
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  CheckoutPage as component
};
