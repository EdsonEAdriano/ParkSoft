"use client";

import React, { useEffect, useState } from "react";
import Home from "./home";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function Page() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession(authOptions);
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  console.log(session);

  return (
    <>
      <Home />
    </>
  );
}
