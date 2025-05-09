
import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { SheetTrigger } from "@/components/ui/sheet";

/**
 * Компонент кнопки мобильного меню
 */
const MobileMenuToggle = () => {
  return (
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden rounded-full hover:bg-blue-50"
      >
        <Icon name="Menu" className="h-5 w-5 text-gray-700" />
      </Button>
    </SheetTrigger>
  );
};

export default MobileMenuToggle;
