import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-dark bg-contain bg-center">
      {children}
    </div>
  );
};

export default Layout;
