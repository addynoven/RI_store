# RI Store - Premium Jewelry E-Commerce

Modern, full-featured e-commerce platform for premium jewelry, built with Next.js 16 and React 19.

🌐 **Live Demo:** [https://ristore.abstergo.me/](https://ristore.abstergo.me/)

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** - Browse jewelry by category with beautiful grid layouts
- **Instant Search** - Real-time search with suggestions
- **Smart Filters** - Category, price range, and sort by price/rating
- **Product Details** - Image gallery, specifications, and related products

### 🛒 Cart & Checkout
- **Shopping Cart** - Add, remove, update quantities with localStorage persistence
- **Multi-step Checkout** - Shipping form → Payment → Confirmation
- **Razorpay Integration** - Secure payments with UPI, Cards, Net Banking
- **Server-side Price Calculation** - Tamper-proof order totals

### ❤️ Wishlist
- **Save Favorites** - Click heart icon on any product
- **Persistent Storage** - Items saved across sessions
- **Quick Add to Cart** - Move wishlist items to cart instantly

### 👤 User Authentication
- **NextAuth.js** - Secure authentication with session management
- **Account Dashboard** - Order history, addresses, payment methods
- **Profile Settings** - Update personal info and preferences

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Modern UI** - Clean, premium aesthetic with smooth animations
- **Accessibility** - Semantic HTML and keyboard navigation

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Auth | [NextAuth.js v5](https://authjs.dev/) |
| Payments | [Razorpay](https://razorpay.com/) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ri-store.git
cd ri-store

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
# NextAuth.js
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000

# Razorpay
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key-id
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, Register
│   ├── account/            # User dashboard
│   ├── api/                # API routes (auth, razorpay)
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── search/             # Search results
│   ├── shop/               # Product listing & details
│   └── ...                 # Other pages
├── components/             # Reusable UI components
│   ├── ui/                 # Base components (Button, Input, etc.)
│   ├── Header.tsx          # Site header with navigation
│   ├── Footer.tsx          # Site footer
│   ├── ProductCard.tsx     # Product display card
│   └── ...
├── context/                # React contexts
│   ├── CartContext.tsx     # Shopping cart state
│   └── WishlistContext.tsx # Wishlist state
├── lib/                    # Utilities and config
│   ├── config.ts           # Site configuration
│   ├── products.ts         # Product data & helpers
│   └── utils.ts            # Helper functions
└── hooks/                  # Custom React hooks
    └── useRazorpay.ts      # Razorpay integration hook
```

---

## 🔧 Configuration

Site configuration is centralized in `src/lib/config.ts`:

```typescript
export const siteConfig = {
  name: "RI STORE",
  tagline: "Premium Jewelry Collection",
  contact: {
    email: "info@ristore.com",
    phone: "+91 123 456 7890",
  },
  // ...more settings
};
```

---

## 📦 Key Components

### Cart Context
```typescript
import { useCart } from "@/context/CartContext";

const { items, addItem, removeItem, getTotal } = useCart();
```

### Wishlist Context
```typescript
import { useWishlist } from "@/context/WishlistContext";

const { items, toggleItem, isInWishlist } = useWishlist();
```

### Razorpay Hook
```typescript
import { useRazorpay } from "@/hooks/useRazorpay";

const { initiatePayment, loading } = useRazorpay();
```

---

## 🔐 Security

- **Server-side price calculation** - Order totals computed on backend
- **Payment signature verification** - Razorpay webhook validation
- **Secure authentication** - NextAuth.js with encrypted sessions
- **Environment variables** - Sensitive data never exposed to client

---

## 📄 License

This project is for educational/demonstration purposes.

---

## 🙏 Acknowledgments

- Design inspired by modern e-commerce platforms
- Product images from [Picsum Photos](https://picsum.photos/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ using Next.js
