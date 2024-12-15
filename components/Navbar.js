"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(20);

    setTimeout(() => {
      setProgress(40);
    }, 100);

    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0);
    }, 50);
  }, []);

  return (
    <nav className="p-2 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-1">
            <Image
              src="/images/Logo_Final.png"
              alt="Rupee Flow Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <span className="text-xl font-bold flex flex-row">
              <div className="text-blue-400">Rupee</div>
              <div className="text-black">Flow</div>
            </span>
          </div>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/"
            className="font-semibold hover:scale-105 hover:font-bold transition-transform duration-300"
          >
            {" "}
            Home
          </Link>
          <Link
            href="/expense-tracker"
            className="font-semibold hover:scale-105 hover:font-bold transition-transform duration-300"
          >
            Expense
          </Link>
          <Link
            href="/gov-schemes"
            className="font-semibold hover:scale-105 hover:font-bold transition-transform duration-300"
          >
            Schemes
          </Link>
          <Link
            href="/loans"
            className="font-semibold hover:scale-105 hover:font-bold transition-transform duration-300"
          >
            Loan
          </Link>
          <Link
            href="/offline-support"
            className="font-semibold hover:scale-105 hover:font-bold transition-transform duration-300"
          >
            Support
          </Link>
          <div className="flex items-center">
            <div className="flex items-center">
              <Link href="/authentication">
                <Button
                  className="mx-1 rounded-full bg-blue-400 text-white font-bold"
                  variant="outline"
                >
                  Get Started
                </Button>
              </Link>
              <ModeToggle />
            </div>

          </div>
        </div>

        <div className="md:hidden">
          <span className="mx-2">
            <ModeToggle />
          </span>
          <Sheet>
            <SheetTrigger>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold my-4">Rupee Flow</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-6">
                    <Link href="/"> Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                    <div>
                      <Button className="mx-1 text-xs" variant="outline">
                        Login
                      </Button>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
