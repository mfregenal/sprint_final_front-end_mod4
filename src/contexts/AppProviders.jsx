import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { CategoryProvider } from "./CategoryContext";
import { ProductProvider } from "./ProductContext";
import { ThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";


export const AppProviders = ({ children }) => (
  <ProductProvider>
    <CategoryProvider>
      <CartProvider>
        <AuthProvider>
          <ThemeProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </ThemeProvider>
        </AuthProvider>
      </CartProvider>
    </CategoryProvider>
  </ProductProvider>
)