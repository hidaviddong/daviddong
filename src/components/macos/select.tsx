import React, { useState, useRef, useEffect } from "react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

function Select({ options, value, onChange, disabled, placeholder = "Select…" }: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "inline-block",
        width: 200,
        fontFamily: "var(--font-body)",
      }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          height: 28,
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
          boxShadow: "var(--bevel-field)",
          border: "none",
          borderRadius: "var(--radius-md)",
          color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
          fontSize: "var(--text-body-md)",
          fontFamily: "var(--font-ui)",
          cursor: disabled ? "default" : "pointer",
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span style={{ color: "var(--text-secondary)", fontSize: 10 }}>▾</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            right: 0,
            background: "rgba(250,250,252,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "var(--shadow-menu)",
            borderRadius: "var(--radius-md)",
            padding: 4,
            zIndex: 10,
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value)
                setOpen(false)
              }}
              style={{
                padding: "5px 8px",
                borderRadius: "4px",
                fontSize: "var(--text-body-md)",
                color: "var(--text-primary)",
                background: opt.value === value ? "var(--accent-500)" : "transparent",
                cursor: "pointer",
                ...(opt.value === value ? { color: "var(--text-on-accent)" } : {}),
              }}
              onMouseEnter={(e) => {
                if (opt.value !== value)
                  e.currentTarget.style.background = "var(--accent-100)"
              }}
              onMouseLeave={(e) => {
                if (opt.value !== value)
                  e.currentTarget.style.background = "transparent"
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { Select }
