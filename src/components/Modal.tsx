"use client";

import { ReactNode, useRef } from "react";

export function Modal({
  trigger,
  title,
  subtitle,
  children,
  dialogClassName = "",
  tone = "primary",
  triggerClassName = "",
  closeOnSubmit = false,
}: {
  trigger: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  dialogClassName?: string;
  tone?: "primary" | "ghost";
  triggerClassName?: string;
  closeOnSubmit?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className={`modal-trigger ${tone} ${triggerClassName}`} type="button" onClick={() => dialogRef.current?.showModal()}>
        {trigger}
      </button>
      <dialog
        className={`modal-dialog ${dialogClassName}`}
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
        onSubmit={(event) => {
          const form = event.target as HTMLFormElement;
          if (closeOnSubmit && form.getAttribute("method") !== "dialog") {
            dialogRef.current?.close();
          }
        }}
      >
        <section className="modal-card">
          <header className="modal-head">
            <div>
              <p className="eyebrow">Focused Action</p>
              <h2>{title}</h2>
              {subtitle ? <p>{subtitle}</p> : null}
            </div>
            <form method="dialog">
              <button className="modal-close" type="submit" aria-label="关闭弹窗">
                ×
              </button>
            </form>
          </header>
          <div className="modal-body">{children}</div>
        </section>
      </dialog>
    </>
  );
}
