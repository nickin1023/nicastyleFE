import React, { ReactNode } from "react";
import { Header } from "../organisms/header/Header";
import { Footer } from "../organisms/footer/Footer";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

Layout.displayName = "Layout";
