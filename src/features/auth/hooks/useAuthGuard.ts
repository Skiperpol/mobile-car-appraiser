import { getAccessToken } from "@/features/auth/storage/auth-storage";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const pathname = usePathname();
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const guardRouteByAuth = async () => {
      try {
        const token = await getAccessToken();
        const isLoginRoute =
          pathname === "/(tabs)/login" || pathname === "/login";

        if (!isMounted) {
          return;
        }

        if (!token && !isLoginRoute) {
          router.replace("/(tabs)/login");
          return;
        }

        if (token && isLoginRoute) {
          router.replace("/(tabs)");
          return;
        }
      } catch {
        if (isMounted) {
          router.replace("/(tabs)/login");
        }
      } finally {
        if (isMounted) {
          setIsAuthResolved(true);
        }
      }
    };

    void guardRouteByAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  return {
    isAuthResolved,
  };
}
