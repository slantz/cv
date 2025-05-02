"use client"

import {LoginModal} from "@/components/login-modal";
import {useAdminHotkey} from "@/hooks/use-admin-hotkey";

export function AdminLoginModalTrigger() {
  const { isLoginModalOpen, setIsLoginModalOpen } = useAdminHotkey()

  return (
    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
  );
}
