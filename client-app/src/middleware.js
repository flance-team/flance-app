
import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export default function middleware(request) {
    // console.log("Halo Dunia", request.nextUrl.pathname);
    // if (request.url ===)
    // return NextResponse.redirect(new URL('/home', request.baseURL));
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// };

// import { useRouter, usePathname } from "next/navigation";

// export default function authMiddleware(Component) {
//     return function WithAuth(props) {
//         const router = useRouter();
//         const pathname = usePathname();
//         const isAuthenticated =
//             typeof window !== "undefined" && !!localStorage.getItem("access_token");



//         if (!isAuthenticated) {
//             if (pathname !== "/" && pathname !== "/SignUpFormEmployer" && pathname !== "/SignUpForm" && pathname !== "/LoginForm") {
//                 typeof window !== "undefined" && router.push("/");
//                 return null;
//             }
//         }
//         else {
//             const role = localStorage.getItem("role");
//             if (role === "user") {
//                 if (pathname === "/EmployerHome" || pathname === "/EmployerListEmployee" || pathname === "/EmployerDeposit" || pathname === "/" || pathname === "/SignUpForm" || pathname === "/SignUpFormEmployer" || pathname === "/LoginForm") {
//                     typeof window !== "undefined" && router.push("/UserHome");
//                     return null;
//                 }
//             }
//             else {
//                 if (pathname === "/UserHome" || pathname === "/UserDeposit" || pathname === "/UserAcceptOffer" || pathname === "/" || pathname === "/SignUpForm" || pathname === "/SignUpFormEmployer" || pathname === "/LoginForm") {
//                     typeof window !== "undefined" && router.push("/EmployerHome");
//                     return null;
//                 }
//             }
//         }


//         return <Component {...props} />;
//     };
// }