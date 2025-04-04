import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router";
import Protected from "./components/Protected";
import ProfileLayout from "./components/profile/ProfileLayout";
import AuthContextWrapper from "./context/AuthContext";
import Cart from "./pages/Cart";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentVerified from "./pages/PaymentSuccess";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProductForm from "./pages/admin/ProductForm";
import AdminProducts from "./pages/admin/Products";
import Orders from "./pages/profile/Orders";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";

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
		path: "/profile",
		element: (
			<Protected requiredRole="user">
				<ProfileLayout />
			</Protected>
		),
		children: [
			{
				path: "orders",
				element: <Orders />,
			},
			{
				element: (
					<Protected>
						<Profile />
					</Protected>
				),
				index: true,
			},
			{
				path: "settings",
				element: <Settings />,
			},
		],
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
		path: "/payment/success",
		element: <PaymentVerified />,
	},
	{
		path: "/payment/failed",
		element: <PaymentFailed />,
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
				<Sonner position="top-center" />
				<RouterProvider router={routes} />
			</AuthContextWrapper>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
