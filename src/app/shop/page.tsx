"use client";

import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "@/components/ProductGrid";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Shop</h1>
          <Breadcrumb items={[{ label: "Shop" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <ProductGrid 
          showFilters={true}
          showSort={true}
          showPagination={true}
          showItemsPerPage={true}
          gridCols={3}
          initialLimit={20}
        />
      </div>
    </div>
  );
}
