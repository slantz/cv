import {motion} from "framer-motion";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import { animate, createScope, createSpring, createDraggable, type Scope } from 'animejs';
import {event} from "@/lib/analytics";

export function Avatar() {
  const root = useRef(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const clickCount = useRef(0);
  const scope = useRef<Scope | null>(null);
  const [ rotations, setRotations ] = useState(0);

  useEffect(() => {
    scope.current = createScope({ root }).add( scope => {
      // Every anime.js instances declared here are now scopped to <div ref={root}>

      createDraggable('#logo-anim', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 }),
        onGrab: () => event({
          action: "logo_drag-grab",
          category: "user_interaction",
          label: "User grab logo to drag"
        })
      });

      // Register function methods to be used outside the useEffect
      scope.add('rotateLogo', (i) => {
        animate('#logo-anim', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });

    });

    // Properly cleanup all anime.js instances declared inside the scope
    return () => scope.current!.revert()
  }, []);

  const handleClick = () => {
    const i = rotations + 1;
    setRotations(i);
    // Animate logo rotation on click using the method declared inside the scope
    scope.current!.methods.rotateLogo(i);
    clickCount.current += 1;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (clickCount.current > 0) {
        event({
          action: "logo_click-around",
          category: "user_interaction",
          label: "User clicked on logo",
          value: clickCount.current,
        });
        clickCount.current = 0;
      }
    }, 300);
  };


  return (
    <div ref={root} className="w-full md:w-1/2 flex justify-center md:justify-end">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, -2, 0, 2, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div id="logo-anim" className="cursor-pointer relative">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-5xl md:text-6xl font-bold text-white font-display relaitve">
              <Image
                src="/avatar.webp"
                alt="Alex1 stake pool logo"
                width={248}
                height={248}
                priority
                className="w-full h-full object-cover"/>
            </div>
          </div>
          <div onClick={handleClick} className="absolute -inset-0.5 rounded-full blur-md bg-gradient-to-br from-purple-500 to-pink-500 opacity-30 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  )
}
