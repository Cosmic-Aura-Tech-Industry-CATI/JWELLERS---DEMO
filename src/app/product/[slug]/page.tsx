import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { mockProducts } from "@/data/mockProducts";

export function generateStaticParams() {
  return mockProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found | AURAVIA Fine Jewellery",
    };
  }

  return {
    title: `${product.name} | AURAVIA Fine Jewellery`,
    description:
      product.subtitle ||
      `Handcrafted ${product.purity} fine jewellery featuring certified natural diamonds.`,
  };
}

export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <ProductPageClient product={product} />
      <Footer />
    </>
  );
}


