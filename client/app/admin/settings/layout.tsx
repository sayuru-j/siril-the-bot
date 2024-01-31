import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <div className="flex h-screen w-screen bg-background">{children}</div>;
}
