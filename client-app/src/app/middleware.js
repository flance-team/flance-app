import { useRouter, usePathname } from "next/navigation";

export default function authMiddleware(Component) {
    return function WithAuth(props) {
        const pathname = usePathname();
        const router = useRouter();
        const isAuthenticated =
            typeof window !== "undefined" && !!localStorage.getItem("access_token");



        if (!isAuthenticated) {
            if (pathname !== "/" && pathname !== "/SignUpFormEmployer" && pathname !== "/SignUpForm" && pathname !== "/LoginForm") {
                typeof window !== "undefined" && router.push("/");
                return null;
            }
        }
        else {
            const role = localStorage.getItem("role");
            if (role === "user") {
                if (pathname === "/EmployerHome" || pathname === "/EmployerListEmployee" || pathname === "/EmployerDeposit" || pathname === "/" || pathname === "/SignUpForm" || pathname === "/SignUpFormEmployer" || pathname === "/LoginForm") {
                    typeof window !== "undefined" && router.push("/UserHome");
                    return null;
                }
            }
            else {
                if (pathname === "/UserHome" || pathname === "/UserDeposit" || pathname === "/UserAcceptOffer" || pathname === "/" || pathname === "/SignUpForm" || pathname === "/SignUpFormEmployer" || pathname === "/LoginForm") {
                    typeof window !== "undefined" && router.push("/EmployerHome");
                    return null;
                }
            }
        }


        return <Component {...props} />;
    };
}