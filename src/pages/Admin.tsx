import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Package, Users, ShoppingBag, Plus, Trash2, Pencil, Save, X, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatINR } from "@/lib/cart";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  name_hi: string;
  price: number;
  category: string;
  emoji: string;
  description: string;
  description_hi: string;
  active: boolean;
  sort_order: number;
};

type LeadRow = { id: string; name: string; phone: string; lang: string | null; source: string; created_at: string };
type OrderItem = { id: string; name: string; price: number; qty: number };
type OrderRow = {
  id: string; customer_name: string; phone: string; address: string;
  notes: string | null; items: OrderItem[]; total: number; status: string; created_at: string;
};

const emptyProduct: Omit<ProductRow, "id"> = {
  slug: "", name: "", name_hi: "", price: 0, category: "", emoji: "🕉️",
  description: "", description_hi: "", active: true, sort_order: 100,
};

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<ProductRow, "id">>(emptyProduct);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const loadAll = async () => {
    const [p, l, o] = await Promise.all([
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    if (p.data) setProducts(p.data as ProductRow[]);
    if (l.data) setLeads(l.data as LeadRow[]);
    if (o.data) setOrders(o.data as unknown as OrderRow[]);
  };

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-3xl font-bold mb-2">Not authorized</h1>
          <p className="text-muted-foreground mb-6">Your account doesn't have admin access.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => signOut().then(() => navigate("/auth"))} variant="outline"><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
            <Button asChild><Link to="/">Back to site</Link></Button>
          </div>
        </div>
      </main>
    );
  }

  const saveProduct = async (row: ProductRow) => {
    const { error } = await supabase.from("products").update({
      slug: row.slug, name: row.name, name_hi: row.name_hi, price: row.price,
      category: row.category, emoji: row.emoji, description: row.description,
      description_hi: row.description_hi, active: row.active, sort_order: row.sort_order,
    }).eq("id", row.id);
    if (error) { toast({ title: error.message, variant: "destructive" }); return; }
    toast({ title: "Product updated" });
    setEditing(null);
    loadAll();
  };

  const createProduct = async () => {
    if (!draft.slug || !draft.name || !draft.price) {
      toast({ title: "Slug, name and price are required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("products").insert(draft);
    if (error) { toast({ title: error.message, variant: "destructive" }); return; }
    toast({ title: "Product created" });
    setCreating(false);
    setDraft(emptyProduct);
    loadAll();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast({ title: error.message, variant: "destructive" }); return; }
    toast({ title: "Product deleted" });
    loadAll();
  };

  const toggleActive = async (p: ProductRow) => {
    const { error } = await supabase.from("products").update({ active: !p.active }).eq("id", p.id);
    if (!error) loadAll();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { toast({ title: error.message, variant: "destructive" }); return; }
    loadAll();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("leads").delete().eq("id", id);
    loadAll();
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm">
              <ArrowLeft className="w-4 h-4" /> Site
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-display text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button size="sm" variant="outline" onClick={() => signOut().then(() => navigate("/"))}>
              <LogOut className="w-4 h-4 mr-1.5" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Stat icon={<Package className="w-5 h-5" />} label="Products" value={products.length} />
          <Stat icon={<Users className="w-5 h-5" />} label="Leads" value={leads.length} />
          <Stat icon={<ShoppingBag className="w-5 h-5" />} label="Orders" value={orders.length} />
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-2xl font-bold">Shop Products</h2>
              <Button onClick={() => setCreating(true)} size="sm"><Plus className="w-4 h-4 mr-1.5" />New product</Button>
            </div>

            {creating && (
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-5 mb-4">
                <h3 className="font-semibold mb-3">New product</h3>
                <ProductForm value={draft} onChange={setDraft} />
                <div className="flex gap-2 mt-4">
                  <Button onClick={createProduct} size="sm"><Save className="w-4 h-4 mr-1.5" />Create</Button>
                  <Button onClick={() => { setCreating(false); setDraft(emptyProduct); }} size="sm" variant="outline"><X className="w-4 h-4 mr-1.5" />Cancel</Button>
                </div>
              </div>
            )}

            <div className="grid gap-3">
              {products.map((p) => editing?.id === p.id ? (
                <div key={p.id} className="rounded-xl border border-primary/40 bg-primary/5 p-5">
                  <ProductForm value={editing} onChange={(v) => setEditing({ ...editing, ...v })} />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => saveProduct(editing)} size="sm"><Save className="w-4 h-4 mr-1.5" />Save</Button>
                    <Button onClick={() => setEditing(null)} size="sm" variant="outline"><X className="w-4 h-4 mr-1.5" />Cancel</Button>
                  </div>
                </div>
              ) : (
                <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                  <div className="text-3xl">{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{p.name}</p>
                      {!p.active && <span className="text-[10px] uppercase bg-muted px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{p.category} · {formatINR(p.price)} · /{p.slug}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => toggleActive(p)} title={p.active ? "Hide" : "Show"}>
                      {p.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditing(p)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteProduct(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p className="text-muted-foreground text-sm">No products yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="leads" className="mt-6">
            <h2 className="font-display text-2xl font-bold mb-4">User Leads</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold">Phone</th>
                    <th className="text-left p-3 font-semibold hidden sm:table-cell">Source</th>
                    <th className="text-left p-3 font-semibold hidden md:table-cell">When</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-border">
                      <td className="p-3 font-medium">{l.name}</td>
                      <td className="p-3"><a href={`tel:${l.phone}`} className="text-primary hover:underline">{l.phone}</a></td>
                      <td className="p-3 text-muted-foreground hidden sm:table-cell">{l.source}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell text-xs">{new Date(l.created_at).toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <Button size="icon" variant="ghost" onClick={() => deleteLead(l.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No leads yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <h2 className="font-display text-2xl font-bold mb-4">Orders</h2>
            <div className="grid gap-3">
              {orders.map((o) => (
                <div key={o.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold">{o.customer_name} · <a href={`tel:${o.phone}`} className="text-primary">{o.phone}</a></p>
                      <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="text-xs rounded-full border border-border bg-background px-3 py-1"
                      >
                        <option value="new">New</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <span className="font-bold text-primary">{formatINR(o.total)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">📍 {o.address}</p>
                  {o.notes && <p className="text-xs italic text-muted-foreground mb-2">"{o.notes}"</p>}
                  <ul className="text-sm space-y-1">
                    {(o.items || []).map((it, i) => (
                      <li key={i} className="flex justify-between"><span>{it.name} × {it.qty}</span><span className="text-muted-foreground">{formatINR(it.price * it.qty)}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
              {orders.length === 0 && <p className="text-muted-foreground text-sm">No orders yet.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">{icon}{label}</div>
    <p className="font-display text-3xl font-bold">{value}</p>
  </div>
);

const ProductForm = ({ value, onChange }: { value: Omit<ProductRow, "id">; onChange: (v: Omit<ProductRow, "id">) => void }) => {
  const set = (k: keyof Omit<ProductRow, "id">, v: string | number | boolean) => onChange({ ...value, [k]: v });
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div><Label>Name (English)</Label><Input value={value.name} onChange={(e) => set("name", e.target.value)} /></div>
      <div><Label>Name (Hindi)</Label><Input value={value.name_hi} onChange={(e) => set("name_hi", e.target.value)} /></div>
      <div><Label>Slug</Label><Input value={value.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-product" /></div>
      <div><Label>Category</Label><Input value={value.category} onChange={(e) => set("category", e.target.value)} /></div>
      <div><Label>Price (₹)</Label><Input type="number" value={value.price} onChange={(e) => set("price", parseInt(e.target.value) || 0)} /></div>
      <div><Label>Emoji / Icon</Label><Input value={value.emoji} onChange={(e) => set("emoji", e.target.value)} /></div>
      <div className="sm:col-span-2"><Label>Description (English)</Label><Textarea value={value.description} onChange={(e) => set("description", e.target.value)} rows={2} /></div>
      <div className="sm:col-span-2"><Label>Description (Hindi)</Label><Textarea value={value.description_hi} onChange={(e) => set("description_hi", e.target.value)} rows={2} /></div>
      <div><Label>Sort order</Label><Input type="number" value={value.sort_order} onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)} /></div>
      <div className="flex items-center gap-2 pt-6">
        <input id="active" type="checkbox" checked={value.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4" />
        <Label htmlFor="active" className="cursor-pointer">Visible in shop</Label>
      </div>
    </div>
  );
};

export default Admin;
