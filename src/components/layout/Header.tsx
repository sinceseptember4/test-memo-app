'use client';

import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link, 
  Button
} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // 文系大学生向けメニュー
  const menuItems = [
    { name: "レポート構成", href: "#" },
    { name: "文献管理", href: "#" },
    { name: "就活ノート", href: "#" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-background/70 backdrop-blur-md border-b border-divider">
      <NavbarContent>
        {/* スマホ用ハンバーガーボタン */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-foreground"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl tracking-tighter">LOGOS</p>
        </NavbarBrand>
      </NavbarContent>

      {/* デスクトップ用：中央にメニュー */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link color="foreground" href={item.href} className="text-sm">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* 右側：ログインボタン */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" size="sm">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* スマホ用展開メニュー */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link color="foreground" className="w-full py-2" href={item.href} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}