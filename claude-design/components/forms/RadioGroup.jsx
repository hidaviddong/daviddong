import React from "react";

export function RadioGroup({ options, value, onChange, name = "radio-group", disabled }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-md)",
              color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
              cursor: disabled ? "default" : "pointer",
              userSelect: "none",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "var(--surface-inset)",
                boxShadow: "var(--bevel-field)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {checked && (
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: disabled ? "var(--text-disabled)" : "var(--accent-500)",
                  }}
                />
              )}
            </span>
            <input
              id={id}
              type="radio"
              name={name}
              checked={checked}
              disabled={disabled}
              onChange={() => onChange && onChange(opt.value)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
