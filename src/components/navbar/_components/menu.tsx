"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Menu() {
  return (
    <NavigationMenu className="hidden lg:flex space-x-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={"/"} legacyBehavior passHref>
            <NavigationMenuLink
              className={`text-gray-700 hover:text-blue-600 transition-all ${navigationMenuTriggerStyle()}`}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={"/verify"} legacyBehavior passHref>
            <NavigationMenuLink
              className={`text-gray-700 hover:text-blue-600 transition-all ${navigationMenuTriggerStyle()}`}
            >
              Verify Credentials
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

  const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";