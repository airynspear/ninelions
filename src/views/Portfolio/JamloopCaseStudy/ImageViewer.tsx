"use client";

import { type KeyboardEventHandler, type ReactNode, useId } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import styles from "./JamloopCaseStudy.module.scss";

export default function ImageViewer({ open, onClose, title, children, onKeyDown }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}) {
  const id = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      aria-labelledby={`${id}-title`}
      transitionDuration={0}
      PaperProps={{ className: styles.enlargedPaper }}
      onKeyDown={(event) => {
        event.stopPropagation();
        onKeyDown?.(event);
      }}
    >
      <DialogTitle id={`${id}-title`} className={styles.enlargedTitle}>{title}</DialogTitle>
      <button autoFocus type="button" className={styles.enlargedClose} onClick={onClose} aria-label="Close enlarged screenshot">
        <span aria-hidden="true">×</span>
      </button>
      <DialogContent className={styles.enlargedContent}>{children}</DialogContent>
    </Dialog>
  );
}
