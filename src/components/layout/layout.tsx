import type { ReactNode } from "react";
import { Header } from "./header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
}
