import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Платье летнее",
      category: "Женская одежда",
      price: 2990,
      stock: 15,
      image: "👗",
      description: "Легкое летнее платье из натурального хлопка",
    },
    {
      id: 2,
      name: "Джинсы классические",
      category: "Мужская одежда",
      price: 3500,
      stock: 8,
      image: "👖",
      description: "Классические джинсы прямого кроя",
    },
    {
      id: 3,
      name: "Кроссовки спортивные",
      category: "Обувь",
      price: 4990,
      stock: 12,
      image: "👟",
      description: "Удобные спортивные кроссовки для бега",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });
    setIsOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      description: product.description,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                stock: Number(formData.stock),
                image: formData.image,
                description: formData.description,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image,
        description: formData.description,
      };
      setProducts([...products, newProduct]);
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm text-pink-600 mb-2">Мой магазин</div>
            <h1 className="text-4xl font-bold text-pink-900">Товары</h1>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-pink-900">
                  {editingProduct ? "Редактировать товар" : "Новый товар"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">
                    Название товара
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">
                    Категория
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Введите категорию"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-pink-800 mb-2">
                      Цена (руб)
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pink-800 mb-2">
                      Остаток
                    </label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">
                    Эмодзи товара
                  </label>
                  <Input
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="🛍️"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-2">
                    Описание
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Описание товара"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    {editingProduct ? "Сохранить" : "Добавить"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-pink-200 bg-white/80 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-100 hover:to-rose-100">
                <TableHead className="text-pink-900 font-bold">Фото</TableHead>
                <TableHead className="text-pink-900 font-bold">Название</TableHead>
                <TableHead className="text-pink-900 font-bold">Категория</TableHead>
                <TableHead className="text-pink-900 font-bold">Цена</TableHead>
                <TableHead className="text-pink-900 font-bold">Остаток</TableHead>
                <TableHead className="text-pink-900 font-bold text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-pink-50/50">
                  <TableCell>
                    <div className="text-4xl">{product.image}</div>
                  </TableCell>
                  <TableCell className="font-medium text-pink-900">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-pink-700">{product.category}</TableCell>
                  <TableCell className="text-pink-900 font-semibold">
                    {product.price} ₽
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 5
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} шт
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(product)}
                        className="text-pink-600 hover:text-pink-800 hover:bg-pink-100"
                      >
                        <Icon name="Pencil" size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
                <Icon name="Package" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">{products.length}</div>
                <div className="text-sm text-pink-600">Всего товаров</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                <Icon name="TrendingUp" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </div>
                <div className="text-sm text-pink-600">На складе</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-pink-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500">
                <Icon name="DollarSign" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-900">
                  {products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()} ₽
                </div>
                <div className="text-sm text-pink-600">Стоимость склада</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Products;