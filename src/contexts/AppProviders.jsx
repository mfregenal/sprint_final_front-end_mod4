import { ProductProvider } from './ProductContext.jsx'
import { CategoryProvider } from './CategoryContext.jsx'
import { CartProvider } from './CartContext.jsx'

export const AppProviders = ({ children }) => (
  <ProductProvider>
    <CategoryProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </CategoryProvider>
  </ProductProvider>
)