'use client';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect (() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleToggle = () => {
        setTheme(theme => theme === 'light' ? 'dark' : 'light');
    }
    
  return (
    <Button
        onClick={handleToggle}
        variant='ghost'
        aria-label={`Toggle theme to ${ theme === 'light' ? 'dark' : 'light'}`}
    >
        { theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ModeToggle;