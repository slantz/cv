"use client"

import {Logo} from "@/components/logo";
import {AuthButton} from "@/components/auth-button";
import {Button} from "@/components/ui/button";
import {Github, Linkedin} from "lucide-react";
import {IconStackOverflow} from "@/components/ui/icon-stack-overflow";
import {IconMedium} from "@/components/ui/icon-medium";
import {useTracking} from "@/hooks/use-tracking";
import type {CVData} from "@/types/core";

interface HeaderProps {
  social: CVData['about']['social'];
}

export function Header(props: HeaderProps) {
  const {trackButtonClick} = useTracking();

  return (
    <header className="container mx-auto py-0 md:py-6 px-4 flex justify-between items-center relative z-10">
      <Logo />
      <div className="flex items-center gap-4">
        <AuthButton />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-purple-500 hover:border-purple-400 hover:bg-purple-950/20"
            onClick={() => trackButtonClick(props.social.linkedin.tracking)}
            asChild
          >
            <a href={props.social.linkedin.link.link} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-purple-400" />
              <span className="sr-only">{props.social.linkedin.link.value}</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-pink-500 hover:border-pink-400 hover:bg-pink-950/20"
            onClick={() => trackButtonClick(props.social.github.tracking)}
            asChild
          >
            <a href={props.social.github.link.link} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-pink-400" />
              <span className="sr-only">{props.social.github.link.value}</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-sky-500 hover:border-sky-400 hover:bg-sky-950/20"
            onClick={() => trackButtonClick(props.social.stackOverflow.tracking)}
            asChild
          >
            <a href={props.social.stackOverflow.link.link} target="_blank" rel="noopener noreferrer">
              <IconStackOverflow className="text-sky-500"/>
              <span className="sr-only">{props.social.stackOverflow.link.value}</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-teal-500 hover:border-teal-400 hover:bg-teal-950/20"
            onClick={() => trackButtonClick(props.social.medium.tracking)}
            asChild
          >
            <a href={props.social.medium.link.link} target="_blank" rel="noopener noreferrer">
              <IconMedium className="text-teal-500"/>
              <span className="sr-only">{props.social.medium.link.value}</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
