import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Protected from "./components/Protected";
import AuthContextWrapper from "./context/AuthContext";
import CartContextWrapper from "./context/CartContext";
import Cart from "./pages/Cart";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<AuthContextWrapper>
				<CartContextWrapper>
					<Sonner />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/shop" element={<Shop />} />
							<Route path="/product/:id" element={<ProductDetail />} />
							<Route
								path="/cart"
								element={
									<Protected fallback={<Login />}>
										<Cart />
									</Protected>
								}
							/>
							<Route path="/auth/login" element={<Login />} />
							<Route path="/auth/signup" element={<Signup />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</CartContextWrapper>
			</AuthContextWrapper>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
