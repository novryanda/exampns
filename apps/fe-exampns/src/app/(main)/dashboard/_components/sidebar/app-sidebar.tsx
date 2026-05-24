"use client";

import Link from "next/link";

import { GraduationCap, ShieldCheck } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SidebarSupportCard } from "./sidebar-support-card";

export function AppSidebar({
  currentUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  readonly currentUser: {
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly role: string;
  };
}) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.sidebarVariant,
      sidebarCollapsible: s.sidebarCollapsible,
      isSynced: s.isSynced,
    })),
  );

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="h-auto rounded-2xl px-3 py-3">
              <Link prefetch={false} href="/dashboard">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-500 text-white shadow-sm">
                  <GraduationCap className="size-5" />
                </div>
                <div className="grid text-left leading-tight">
                  <span className="font-semibold text-base text-slate-950">ExamCPNS</span>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    <ShieldCheck className="size-3" />
                    Admin
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} userRole={currentUser.role} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSupportCard />
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
