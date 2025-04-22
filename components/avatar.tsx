import {motion} from "framer-motion";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import { animate, createScope, createSpring, createDraggable, type Scope } from 'animejs';

export function Avatar() {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);
  const [ rotations, setRotations ] = useState(0);

  useEffect(() => {

    scope.current = createScope({ root }).add( scope => {
      // Every anime.js instances declared here are now scopped to <div ref={root}>

      createDraggable('#logo-anim', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 })
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
                src="/ChatGPT Image 22 апр. 2025 г., 17_22_57.png"
                alt="Alex1 stake pool logo"
                width={250}
                height={250}
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
