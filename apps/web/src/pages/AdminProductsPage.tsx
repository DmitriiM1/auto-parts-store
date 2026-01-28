import React, { useEffect, useState } from 'react'

import type { Product } from '../features/products/types'
import {
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../features/products/api'

type FormMode = 'create' | 'edit';

interface ProductFormState {
    id?: string;
    name: string;
    brand: string;
    sku: string;
    price: string;
    stock: string;
    imageUrl: string;
    categoryId: string;
}

const emptyForm: ProductFormState = {
    name: '',
    brand: '',
    sku: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
};

export function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<FormMode>('create');
    const [form, setForm] = useState<ProductFormState>(emptyForm);

    async function loadProducts() {
        try {
            setLoading(true);
            setError(null);
            const data = await listProducts({ page: 1, pageSize: 100 });
            setProducts(data.items);
        } catch (e) {
            setError('Failed to load products');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function startCreate() {
        setMode('create');
        setForm(emptyForm);
    }

    function startEdit(product: Product) {
        setMode('edit');
        setForm({
            id: product.id,
            name: product.name,
            brand: product.brand,
            sku: product.sku,
            price: product.price.toString(),
            stock: product.stock.toString(),
            imageUrl: product.imageUrl ?? '',
            categoryId: product.categoryId,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const payload = {
            name: form.name.trim(),
            brand: form.brand.trim(),
            sku: form.sku.trim(),
            price: Number(form.price),
            stock: Number(form.stock),
            imageUrl: form.imageUrl.trim() || undefined,
            categoryId: form.categoryId.trim(),
        };

        try {
            if (mode === 'create') {
                await createProduct(payload);
            } else if (mode === 'edit' && form.id) {
                await updateProduct(form.id, payload);
            }
            await loadProducts();
            if (mode === 'create') {
                setForm(emptyForm);
            }
        } catch (e) {
            setError('Failed to save product (check admin token and payload)');
            console.error(e);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this product?')) return;
        try {
            setSaving(true);
            setError(null);
            await deleteProduct(id);
            await loadProducts();
        } catch (e) {
            setError('Failed to delete product');
            console.error(e);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Admin · Products</h1>
                        <p className="text-sm text-slate-400">
                            Manage catalog: create, edit and delete auto parts.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={startCreate}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 transition"
                    >
                        + New product
                    </button>
                </div>

                {error && (
                    <div className="mb-4 rounded-md bg-red-900/40 border border-red-500/60 px-3 py-2 text-sm text-red-100">
                        {error}
                    </div>
                )}

                <div className="grid gap-8 md:grid-cols-[2fr,1.4fr]">
                    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/70 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-medium">Products ({products.length})</h2>
                            {loading && (
                                <span className="text-xs text-slate-400">Loading...</span>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-700/70 text-slate-400">
                                        <th className="py-2 pr-2 text-left">Name</th>
                                        <th className="py-2 px-2 text-left">Brand</th>
                                        <th className="py-2 px-2 text-left">SKU</th>
                                        <th className="py-2 px-2 text-right">Price</th>
                                        <th className="py-2 px-2 text-right">Stock</th>
                                        <th className="py-2 px-2 text-left">Category</th>
                                        <th className="py-2 pl-2 pr-1 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr
                                            key={p.id}
                                            className="border-b border-slate-800/70 last:border-0 hover:bg-slate-800/40"
                                        >
                                            <td className="py-2 pr-2">{p.name}</td>
                                            <td className="py-2 px-2 text-slate-300">{p.brand}</td>
                                            <td className="py-2 px-2 font-mono text-xs text-slate-400">
                                                {p.sku}
                                            </td>
                                            <td className="py-2 px-2 text-right">
                                                ${p.price.toFixed(2)}
                                            </td>
                                            <td className="py-2 px-2 text-right">{p.stock}</td>
                                            <td className="py-2 px-2 text-slate-300">
                                                {p.category?.name ?? p.categoryId}
                                            </td>
                                            <td className="py-2 pl-2 pr-1 text-right space-x-1">
                                                <button
                                                    type="button"
                                                    onClick={() => startEdit(p)}
                                                    className="rounded-md bg-slate-700 px-2 py-1 text-xs hover:bg-slate-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(p.id)}
                                                    className="rounded-md bg-red-600 px-2 py-1 text-xs hover:bg-red-500"
                                                >
                                                    Del
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {!loading && products.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="py-6 text-center text-slate-400 text-sm"
                                            >
                                                No products yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/70 p-4">
                        <h2 className="text-lg font-medium mb-2">
                            {mode === 'create' ? 'Create product' : 'Edit product'}
                        </h2>
                        <p className="text-xs text-slate-400 mb-4">
                            Fields marked with <span className="text-red-400">*</span> are required.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label htmlFor='prod-name' className="block text-xs mb-1">
                                    Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id='prod-name'
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor='prod-brand' className="block text-xs mb-1">
                                        Brand <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id='prod-brand'
                                        name="brand"
                                        value={form.brand}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='prod-sku' className="block text-xs mb-1">
                                        SKU <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id='prod-sku'
                                        name="sku"
                                        value={form.sku}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor='prod-price' className="block text-xs mb-1">
                                        Price, $ <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id='prod-price' 
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='prod-stock' className="block text-xs mb-1">
                                        Stock <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id='prod-stock'
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={form.stock}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='prod-categoryId' className="block text-xs mb-1">
                                    Category ID <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id='prod-categoryId'
                                    name="categoryId"
                                    value={form.categoryId}
                                    onChange={handleChange}
                                    className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <p className="mt-1 text-[11px] text-slate-500">
                                    Сейчас просто вставляй ID категории из /categories.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs mb-1">Image URL</label>
                                <input
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    placeholder="/images/products/ABC-123.jpeg"
                                    className="w-full rounded-md bg-slate-800 border border-slate-600 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
                                >
                                    {saving
                                        ? mode === 'create'
                                            ? 'Creating...'
                                            : 'Saving...'
                                        : mode === 'create'
                                            ? 'Create'
                                            : 'Save changes'}
                                </button>

                                {mode === 'edit' && (
                                    <button
                                        type="button"
                                        onClick={startCreate}
                                        className="text-xs text-slate-400 hover:text-slate-200"
                                    >
                                        Cancel edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}