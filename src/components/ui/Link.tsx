import * as React from "react";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href = "", external, children, ...props }, ref) => {
    const isExternal = external || href.startsWith("http");
    
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "text-primary underline-offset-4 hover:underline",
          className
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export { Link };
