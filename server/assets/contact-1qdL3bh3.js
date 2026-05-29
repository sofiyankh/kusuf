import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { B as Button, s as supabase } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { T as Textarea } from "./textarea-BL7vV12y.js";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { toast } from "sonner";
import "@tanstack/react-router";
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
const schema = z.object({
  name: z.string().trim().min(2, "الاسم قصير").max(100),
  email: z.string().trim().email("بريد غير صالح").max(255),
  message: z.string().trim().min(5, "الرسالة قصيرة").max(2e3)
});
function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.from("contact_messages").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("تعذر الإرسال — حاول مرة أخرى");
      return;
    }
    toast.success("تم إرسال رسالتك ✓");
    setSent(true);
    setForm({
      name: "",
      email: "",
      message: ""
    });
    setTimeout(() => setSent(false), 4e3);
  };
  return /* @__PURE__ */ jsxs("div", { dir: "rtl", className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("section", { className: "pt-[120px] md:pt-[160px] pb-16 md:pb-24 bg-gradient-to-br from-primary/10 to-secondary/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 text-center space-y-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-bold", children: "تواصل معنا" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "لدينا دعم لطيف وسريع. أرسل رسالتك ونحن في الخدمة." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "معلومات التواصل" }),
          [{
            icon: Phone,
            label: "الهاتف",
            value: "+216 XX XXX XXX"
          }, {
            icon: Mail,
            label: "البريد الإلكتروني",
            value: "hello@Kusuf.tn"
          }, {
            icon: MapPin,
            label: "الموقع",
            value: "تونس، تونس"
          }].map((c) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(c.icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: c.label }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: c.value })
            ] })
          ] }, c.label))
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "bg-card p-8 rounded-2xl border border-border space-y-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "أرسل رسالة" }),
          /* @__PURE__ */ jsx(Input, { placeholder: "الاسم الكامل", required: true, maxLength: 100, value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }) }),
          /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "البريد الإلكتروني", required: true, maxLength: 255, value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }) }),
          /* @__PURE__ */ jsx(Textarea, { placeholder: "رسالتك...", rows: 6, required: true, maxLength: 2e3, value: form.message, onChange: (e) => setForm({
            ...form,
            message: e.target.value
          }) }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12", children: [
            /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
            loading ? "جاري الإرسال..." : sent ? "تم الإرسال ✓" : "إرسال الرسالة"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ContactPage as component
};
