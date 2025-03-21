import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router";
import Protected from "./components/Protected";
import AuthContextWrapper from "./context/AuthContext";
import Cart from "./pages/Cart";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProductForm from "./pages/admin/ProductForm";
import AdminProducts from "./pages/admin/Products";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
	},

	{
		path: "/shop",
		element: <Shop />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/product/:id",
		element: <ProductDetail />,
	},
	{
		path: "/auth",
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "signup",
				element: <Signup />,
			},
		],
	},
	{
		path: "/admin",
		element: (
			<Protected requiredRole="admin">
				<AdminDashboard />
			</Protected>
		),
	},
	{
		path: "/admin/products",
		element: (
			<Protected requiredRole="admin">
				<AdminProducts />
			</Protected>
		),
	},
	{
		path: "/admin/products/new",
		element: (
			<Protected requiredRole="admin">
				<AdminProductForm />
			</Protected>
		),
	},
	{
		path: "/admin/products/edit/:id",
		element: (
			<Protected requiredRole="admin">
				<AdminProductForm />
			</Protected>
		),
	},
	{
		path: "/admin/orders",
		element: (
			<Protected requiredRole="admin">
				<AdminOrders />
			</Protected>
		),
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<AuthContextWrapper>
				<Sonner />
				<RouterProvider router={routes} />
			</AuthContextWrapper>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
