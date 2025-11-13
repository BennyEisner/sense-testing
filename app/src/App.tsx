import { useState } from "react";

type Product = { id: number; name: string; price: number };
type Page = "login" | "catalog" | "checkout" | "profile";

const products: Product[] = [
  { id: 1, name: "Widget Alpha", price: 10 },
  { id: 2, name: "Widget Beta", price: 20 },
  { id: 3, name: "Widget Gamma", price: 30 }
];

const validUser = { email: "test@example.com", password: "Password123" };

function App() {
  const [page, setPage] = useState<Page>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [name, setName] = useState("Test User");
  const [message, setMessage] = useState("");

  const login = () => {
    if (email === validUser.email && password === validUser.password) {
      setLoggedIn(true);
      setPage("catalog");
      setMessage("Login successful");
    } else {
      setMessage("Invalid credentials");
    }
  };

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
  };

  const checkout = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty");
    } else {
      setCart([]);
      setMessage("Checkout complete");
    }
  };

  const updateProfile = () => {
    setMessage("Profile updated");
  };

  const nav = (target: Page) => {
    if (!loggedIn) return;
    setPage(target);
    setMessage("");
  };

  return (
    <div>
      <header>
        <h1 data-testid="app-title">AI E2E Sandbox</h1>
        {loggedIn && (
          <nav>
            <button data-testid="nav-catalog" onClick={() => nav("catalog")}>
              Catalog
            </button>
            <button data-testid="nav-checkout" onClick={() => nav("checkout")}>
              Checkout
            </button>
            <button data-testid="nav-profile" onClick={() => nav("profile")}>
              Profile
            </button>
          </nav>
        )}
      </header>

      {page === "login" && (
        <section data-testid="page-login">
          <h2>Login</h2>
          <input
            data-testid="login-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            data-testid="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button data-testid="login-submit" onClick={login}>
            Login
          </button>
        </section>
      )}

      {page === "catalog" && (
        <section data-testid="page-catalog">
          <h2>Catalog</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span data-testid={`product-${product.id}-name`}>
                  {product.name}
                </span>
                <span data-testid={`product-${product.id}-price`}>
                  ${product.price}
                </span>
                <button
                  data-testid={`product-${product.id}-add`}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {page === "checkout" && (
        <section data-testid="page-checkout">
          <h2>Checkout</h2>
          <div data-testid="cart-count">Items: {cart.length}</div>
          <button data-testid="checkout-submit" onClick={checkout}>
            Confirm Checkout
          </button>
        </section>
      )}

      {page === "profile" && (
        <section data-testid="page-profile">
          <h2>Profile</h2>
          <input
            data-testid="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button data-testid="profile-save" onClick={updateProfile}>
            Save
          </button>
        </section>
      )}

      {message && <div data-testid="banner-message">{message}</div>}
    </div>
  );
}

export default App;

