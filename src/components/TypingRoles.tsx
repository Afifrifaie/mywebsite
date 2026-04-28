"use client";

import { useEffect, useState } from "react";

const ROLES = ["Front End Developer", "Web Developer"];

const TYPE_SPEED = 75;
const DELETE_SPEED = 40;
const HOLD_AFTER_TYPE = 1400;
const HOLD_AFTER_DELETE = 250;

export default function TypingRoles() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "between">(
    "typing"
  );

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timer = setTimeout(() => setPhase("deleting"), HOLD_AFTER_TYPE);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, HOLD_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, roleIndex]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-accent">{text}</span>
      <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent" />
    </span>
  );
}
