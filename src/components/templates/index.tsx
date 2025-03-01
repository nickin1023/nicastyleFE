import ErrorBoundary from "@/src/pages/errorBoundary";
import { ReactNode } from "react";
import { Footer } from "../organisms/footer/Footer";
import { Header } from "../organisms/header/Header";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </>
  );
};

Layout.displayName = "Layout";
