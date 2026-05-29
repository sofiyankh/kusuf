import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { c as cn, u as useAuth, s as supabase, B as Button, d as useNotifications } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { User, LogOut, ShoppingBag, Heart, MapPin, Bell, MessageCircle, X, Plus, Star } from "lucide-react";
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
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const STATUS_STEPS = [{
  key: "pending",
  label: "قيد الانتظار"
}, {
  key: "processing",
  label: "قيد التجهيز"
}, {
  key: "shipped",
  label: "تم الشحن"
}, {
  key: "delivered",
  label: "تم التسليم"
}];
const STATUS_LABEL = {
  pending: "قيد الانتظار",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى"
};
function AccountPage() {
  const {
    user,
    loading,
    logout,
    isAdmin
  } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(false);
  const [noAdmins, setNoAdmins] = useState(false);
  useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login"
    });
  }, [user, loading, navigate]);
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("name").eq("id", user.id).maybeSingle().then(({
      data
    }) => setName(data?.name || ""));
    if (!isAdmin) {
      supabase.rpc("any_admin_exists").then(({
        data
      }) => {
        setNoAdmins(data === false);
      });
    }
  }, [user, isAdmin]);
  if (loading || !user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "جاري التحميل..." }) });
  }
  const claimAdmin = async () => {
    const {
      error
    } = await supabase.rpc("promote_first_admin");
    if (error) return toast.error(error.message);
    toast.success("تم منحك صلاحيات المسؤول بنجاح!");
    window.location.reload();
  };
  const saveProfile = async () => {
    const {
      error
    } = await supabase.from("profiles").update({
      name
    }).eq("id", user.id);
    if (error) return toast.error(error.message);
    toast.success("تم الحفظ");
    setEditing(false);
  };
  const initial = (name || user.email || "U")[0].toUpperCase();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background", dir: "rtl", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pt-[100px] md:pt-[120px] pb-8 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-gradient-to-br from-primary/15 via-card to-secondary/10 rounded-3xl p-6 md:p-8 mb-6 border border-border shadow-sm animate-fade-in", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -left-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -right-8 w-56 h-56 bg-secondary/15 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row md:items-center gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold text-3xl md:text-4xl shadow-xl ring-4 ring-background", children: initial }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "مرحباً بعودتك" }),
            !editing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-bold truncate", children: name || user.email?.split("@")[0] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: user.email })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-2 mt-2 max-w-xl", children: [
              /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "الاسم" }),
              /* @__PURE__ */ jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+216 ..." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            noAdmins && !isAdmin && /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", onClick: claimAdmin, className: "bg-amber-500 hover:bg-amber-600 text-white", children: "تفعيل صلاحيات المسؤول" }),
            !editing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => setEditing(true), children: [
                /* @__PURE__ */ jsx(User, { className: "w-4 h-4 ml-1" }),
                " تعديل"
              ] }),
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: logout, children: [
                /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 ml-1" }),
                " خروج"
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Button, { size: "sm", onClick: saveProfile, children: "حفظ" }),
              /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditing(false), children: "إلغاء" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "orders", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid grid-cols-4 mb-6", children: [
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "orders", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4 ml-1" }),
            " طلباتي"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "wishlist", children: [
            /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4 ml-1" }),
            " المفضلة"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "addresses", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 ml-1" }),
            " العناوين"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "notifications", children: [
            /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4 ml-1" }),
            " الإشعارات"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsx(OrdersTab, {}) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "wishlist", children: /* @__PURE__ */ jsx(WishlistTab, {}) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "addresses", children: /* @__PURE__ */ jsx(AddressesTab, {}) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "notifications", children: /* @__PURE__ */ jsx(NotificationsTab, {}) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [opened, setOpened] = useState(null);
  const load = useCallback(async () => {
    const {
      data
    } = await supabase.from("orders").select("*").order("created_at", {
      ascending: false
    });
    setOrders(data || []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const cancel = async (id) => {
    if (!confirm("هل تريد إلغاء هذا الطلب؟")) return;
    const {
      error
    } = await supabase.from("orders").update({
      status: "cancelled"
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الإلغاء");
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: [{
      k: "all",
      l: "الكل"
    }, ...STATUS_STEPS.map((s) => ({
      k: s.key,
      l: s.label
    })), {
      k: "cancelled",
      l: "ملغى"
    }].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f.k), className: `px-4 py-1.5 rounded-full text-sm transition-colors ${filter === f.k ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"}`, children: f.l }, f.k)) }),
    filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-card rounded-xl border border-border", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "لا توجد طلبات" }),
      /* @__PURE__ */ jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsx(Button, { children: "ابدأ التسوق" }) })
    ] }) : filtered.map((o) => {
      const stepIdx = STATUS_STEPS.findIndex((s) => s.key === o.status);
      const isOpen = opened === o.id;
      return /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-5 transition-all", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono font-semibold", children: o.order_number || `#${o.id.slice(0, 8)}` }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString("ar-TN") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-end", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-primary", children: [
              Number(o.total_amount).toFixed(2),
              " د.ت"
            ] }),
            /* @__PURE__ */ jsx("span", { className: `inline-block mt-1 text-xs px-3 py-0.5 rounded-full ${o.status === "cancelled" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`, children: STATUS_LABEL[o.status] || o.status })
          ] })
        ] }),
        o.status !== "cancelled" && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 mb-4", children: STATUS_STEPS.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= stepIdx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: i + 1 }),
          i < STATUS_STEPS.length - 1 && /* @__PURE__ */ jsx("div", { className: `flex-1 h-1 mx-1 rounded ${i < stepIdx ? "bg-primary" : "bg-muted"}` })
        ] }, s.key)) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setOpened(isOpen ? null : o.id), className: "text-sm text-primary hover:underline", children: isOpen ? "إخفاء التفاصيل" : "عرض التفاصيل" }),
        isOpen && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-border space-y-3 animate-fade-in", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: (Array.isArray(o.items) ? o.items : []).map((it, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
            it.image && /* @__PURE__ */ jsx("img", { src: it.image, alt: "", className: "w-10 h-10 rounded object-cover" }),
            /* @__PURE__ */ jsx("span", { className: "flex-1", children: it.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
              it.quantity,
              "× ",
              Number(it.price).toFixed(2),
              " د.ت"
            ] })
          ] }, i)) }),
          o.shipping_address && (() => {
            const addr = o.shipping_address;
            return /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground bg-muted/30 rounded p-3", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                addr.name,
                " • ",
                addr.phone
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                addr.address,
                "، ",
                addr.city
              ] })
            ] });
          })(),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("a", { href: `https://wa.me/?text=${encodeURIComponent(`استفسار عن طلبي: ${o.order_number || o.id}`)}`, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 ml-1" }),
              " تواصل"
            ] }) }),
            o.status === "pending" && /* @__PURE__ */ jsxs(Button, { variant: "destructive", size: "sm", onClick: () => cancel(o.id), children: [
              /* @__PURE__ */ jsx(X, { className: "w-4 h-4 ml-1" }),
              " إلغاء الطلب"
            ] })
          ] })
        ] })
      ] }, o.id);
    })
  ] });
}
function WishlistTab() {
  const {
    user
  } = useAuth();
  const [items, setItems] = useState([]);
  const load = useCallback(async () => {
    if (!user) return;
    supabase.from("wishlists").select("id,product_id,created_at,products:product_id(*)").eq("user_id", user.id).then(({
      data
    }) => setItems(data || []));
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);
  const remove = async (id) => {
    await supabase.from("wishlists").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast("أزيل من المفضلة");
  };
  if (!items.length) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-card rounded-xl border border-border", children: [
      /* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "قائمتك فارغة" })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((it) => {
    const p = it.products;
    if (!p) return null;
    return /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: p.image ?? void 0, alt: p.name, className: "w-full h-40 object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", children: p.name_ar || p.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-primary font-bold", children: [
            Number(p.price).toFixed(2),
            " د.ت"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => remove(it.id), children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
        ] })
      ] })
    ] }, it.id);
  }) });
}
function AddressesTab() {
  const {
    user
  } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    label: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: ""
  });
  const [adding, setAdding] = useState(false);
  const load = useCallback(async () => {
    if (!user) return;
    const {
      data
    } = await supabase.from("addresses").select("*").eq("user_id", user.id).order("created_at", {
      ascending: false
    });
    setList(data || []);
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);
  const save = async (e) => {
    e.preventDefault();
    if (!user) return;
    const {
      error
    } = await supabase.from("addresses").insert({
      ...form,
      user_id: user.id
    });
    if (error) return toast.error(error.message);
    toast.success("أُضيف العنوان");
    setForm({
      label: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      zip: ""
    });
    setAdding(false);
    load();
  };
  const remove = async (id) => {
    await supabase.from("addresses").delete().eq("id", id);
    toast("حُذف العنوان");
    load();
  };
  const setDefault = async (id) => {
    if (!user) return;
    await supabase.from("addresses").update({
      is_default: false
    }).eq("user_id", user.id);
    await supabase.from("addresses").update({
      is_default: true
    }).eq("id", id);
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    !adding && /* @__PURE__ */ jsxs(Button, { onClick: () => setAdding(true), children: [
      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 ml-1" }),
      " إضافة عنوان"
    ] }),
    adding && /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "bg-card border border-border rounded-xl p-5 grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Input, { placeholder: "اسم العنوان (المنزل، العمل...)", value: form.label, onChange: (e) => setForm({
        ...form,
        label: e.target.value
      }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "الاسم الكامل", required: true, value: form.name, onChange: (e) => setForm({
        ...form,
        name: e.target.value
      }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "رقم الهاتف", required: true, value: form.phone, onChange: (e) => setForm({
        ...form,
        phone: e.target.value
      }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "المدينة", required: true, value: form.city, onChange: (e) => setForm({
        ...form,
        city: e.target.value
      }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "الرمز البريدي", value: form.zip, onChange: (e) => setForm({
        ...form,
        zip: e.target.value
      }) }),
      /* @__PURE__ */ jsx(Input, { className: "sm:col-span-2", placeholder: "العنوان الكامل", required: true, value: form.address, onChange: (e) => setForm({
        ...form,
        address: e.target.value
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", children: "حفظ" }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setAdding(false), children: "إلغاء" })
      ] })
    ] }),
    list.length === 0 && !adding && /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-12", children: "لا توجد عناوين محفوظة" }),
    list.map((a) => /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary flex-shrink-0 mt-1" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: a.label || "عنوان" }),
          a.is_default && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-primary/10 text-primary", children: "افتراضي" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          a.name,
          " • ",
          a.phone
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          a.address,
          "، ",
          a.city,
          " ",
          a.zip
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        !a.is_default && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => setDefault(a.id), children: /* @__PURE__ */ jsx(Star, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => remove(a.id), children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
      ] })
    ] }, a.id))
  ] });
}
function NotificationsTab() {
  const {
    notifications,
    markAllRead,
    markRead
  } = useNotifications();
  return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: notifications.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-12", children: "لا توجد إشعارات" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: markAllRead, children: "قراءة الكل" }) }),
    notifications.map((n) => /* @__PURE__ */ jsx("div", { onClick: () => !n.read && markRead(n.id), className: `p-4 rounded-lg border cursor-pointer ${n.read ? "bg-card border-border" : "bg-primary/5 border-primary/30"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: n.title }),
        n.body && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: n.body })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(n.created_at).toLocaleDateString("ar-TN") })
    ] }) }, n.id))
  ] }) });
}
export {
  AccountPage as component
};
