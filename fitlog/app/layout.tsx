
import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0d0f12] text-white">

        {/* Provider wraps Navbar and all pages */}
        <WorkoutProvider>

          <div className="flex min-h-screen flex-col">

            {/* Suspense fixes usePathname build error */}
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>

            <main className="flex-1">
              {children}
            </main>

            <Footer />

          </div>

          <ToastContainer
            position="top-right"
            autoClose={2500}
            theme="dark"
          />

        </WorkoutProvider>

      </body>
    </html>
  );
}
