"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: admin, error } = await supabase.rpc("ac1899_is_admin");
      if (error || admin !== true) { router.replace("/iscriviti"); return; }
      setAllowed(true);
    }

    checkSession();
  }, [router]);

  if (!allowed) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial",
          color: "#111827",
        }}
      >
        <h2>Verifica accesso...</h2>
      </main>
    );
  }

  return <>{children}</>;
}