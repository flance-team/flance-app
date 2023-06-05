import { useRouter } from "next/navigation";

export default function authMiddleware(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const isAuthenticated =
      typeof window !== "undefined" && !!localStorage.getItem("access_token");

    if (!isAuthenticated) {
      typeof window !== "undefined" && router.push("/login");
      return null;
    }

    return <Component {...props} />;
  };
}
