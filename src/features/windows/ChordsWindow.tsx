import { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Select,
  Separator,
  Slider,
  Tabs,
} from "@/components/macos";
import {
  findChord,
  identifyChord,
  type ChordMatch,
  type ChordPosition,
} from "@/lib/chords";
import { midiToName, strumChord } from "@/lib/music";

interface SheetChord {
  name: string;
  position: ChordPosition;
}

interface SheetMeta {
  id: string;
  name: string;
}

const TOKEN_KEY = "chords:token";

// ---- Chord diagram (SVG) ----

const STRINGS = 6;
const X0 = 30; // left edge of the grid
const Y0 = 32; // top edge of the grid (nut)
const SX = 16; // string spacing
const FY = 26; // fret spacing

function ChordDiagram({
  position,
  width,
  showFingers = false,
}: {
  position: ChordPosition;
  width: number;
  showFingers?: boolean;
}) {
  const { frets, fingers, baseFret, barres } = position;
  const fretCount = Math.max(4, ...frets);
  const height = Y0 + fretCount * FY + 6;
  const stringX = (i: number) => X0 + i * SX;
  const fretY = (f: number) => Y0 + f * FY; // grid line below fret f
  const dotY = (f: number) => Y0 + (f - 0.5) * FY;

  return (
    <svg
      viewBox={`0 0 ${X0 + (STRINGS - 1) * SX + 22} ${height}`}
      width={width}
      aria-hidden="true"
    >
      {/* nut / base fret label */}
      {baseFret === 1 ? (
        <rect
          x={X0 - 1.5}
          y={Y0 - 3.5}
          width={(STRINGS - 1) * SX + 3}
          height={4}
          rx={1.5}
          fill="var(--gray-800)"
        />
      ) : (
        <text
          x={X0 - 7}
          y={Y0 + FY / 2 + 3.5}
          textAnchor="end"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {baseFret}fr
        </text>
      )}

      {/* grid */}
      {Array.from({ length: STRINGS }, (_, i) => (
        <line
          key={`s${i}`}
          x1={stringX(i)}
          y1={Y0}
          x2={stringX(i)}
          y2={fretY(fretCount)}
          stroke="var(--gray-500)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: fretCount + 1 }, (_, f) => (
        <line
          key={`f${f}`}
          x1={X0}
          y1={fretY(f)}
          x2={stringX(STRINGS - 1)}
          y2={fretY(f)}
          stroke="var(--gray-400)"
          strokeWidth="1"
        />
      ))}

      {/* muted / open markers above the nut */}
      {frets.map((f, i) =>
        f === -1 ? (
          <text
            key={`m${i}`}
            x={stringX(i)}
            y={Y0 - 9}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            ×
          </text>
        ) : f === 0 ? (
          <circle
            key={`m${i}`}
            cx={stringX(i)}
            cy={Y0 - 12}
            r="3.2"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.1"
          />
        ) : null,
      )}

      {/* barres */}
      {barres.map((b) => {
        const on = frets
          .map((f, i) => (f === b ? i : -1))
          .filter((i) => i >= 0);
        if (on.length < 2) return null;
        const x1 = stringX(Math.min(...on));
        const x2 = stringX(Math.max(...on));
        return (
          <rect
            key={`b${b}`}
            x={x1 - 6.5}
            y={dotY(b) - 6.5}
            width={x2 - x1 + 13}
            height={13}
            rx={6.5}
            fill="var(--gray-800)"
          />
        );
      })}

      {/* fingered notes */}
      {frets.map((f, i) =>
        f > 0 ? (
          <g key={`d${i}`}>
            <circle
              cx={stringX(i)}
              cy={dotY(f)}
              r="6.5"
              fill="var(--gray-800)"
            />
            {showFingers && fingers[i] > 0 && (
              <text
                x={stringX(i)}
                y={dotY(f) + 3}
                textAnchor="middle"
                fontSize="8.5"
                fill="#ffffff"
              >
                {fingers[i]}
              </text>
            )}
          </g>
        ) : null,
      )}
    </svg>
  );
}

// ---- Interactive fretboard (reverse chord finder) ----

const STD_TUNING = [40, 45, 50, 55, 59, 64]; // low E → high e
const BOARD_FRETS = 12;
const BX = 26; // nut x
const BF = 30; // fret spacing
const BY = 14; // first string y
const BS = 19; // string spacing
const INLAYS = [3, 5, 7, 9];

// taps: one entry per string (low E first); -1 muted, 0 open, n = fret held.
function Fretboard({
  taps,
  onTap,
}: {
  taps: number[];
  onTap: (string: number, fret: number) => void;
}) {
  const rowY = (s: number) => BY + (5 - s) * BS; // high e drawn on top
  const cellX = (f: number) => BX + (f - 0.5) * BF;
  const width = BX + BOARD_FRETS * BF + 4;

  return (
    <svg viewBox={`0 0 ${width} 136`} className="w-full" aria-hidden="true">
      {/* inlay dots */}
      {INLAYS.map((f) => (
        <circle key={f} cx={cellX(f)} cy={BY + 2.5 * BS} r="4" fill="var(--gray-200)" />
      ))}
      <circle cx={cellX(12)} cy={BY + 1.5 * BS} r="4" fill="var(--gray-200)" />
      <circle cx={cellX(12)} cy={BY + 3.5 * BS} r="4" fill="var(--gray-200)" />

      {/* nut + fret wires */}
      <rect
        x={BX - 3}
        y={BY - 2}
        width={3.5}
        height={5 * BS + 4}
        rx={1.5}
        fill="var(--gray-800)"
      />
      {Array.from({ length: BOARD_FRETS }, (_, i) => (
        <line
          key={i}
          x1={BX + (i + 1) * BF}
          y1={BY}
          x2={BX + (i + 1) * BF}
          y2={BY + 5 * BS}
          stroke="var(--gray-400)"
        />
      ))}

      {/* strings, thicker toward low E */}
      {taps.map((_, s) => (
        <line
          key={s}
          x1={BX}
          y1={rowY(s)}
          x2={width - 4}
          y2={rowY(s)}
          stroke="var(--gray-600)"
          strokeWidth={0.7 + (5 - s) * 0.22}
        />
      ))}

      {/* fret numbers */}
      {[...INLAYS, 12].map((f) => (
        <text
          key={f}
          x={cellX(f)}
          y={BY + 5 * BS + 14}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-secondary)"
        >
          {f}
        </text>
      ))}

      {/* open / muted markers left of the nut */}
      {taps.map((t, s) =>
        t === 0 ? (
          <circle
            key={s}
            cx={11}
            cy={rowY(s)}
            r="4"
            fill="none"
            stroke="var(--accent-500)"
            strokeWidth="1.5"
          />
        ) : t === -1 ? (
          <text
            key={s}
            x={11}
            y={rowY(s) + 3.5}
            textAnchor="middle"
            fontSize="10"
            fill="var(--gray-400)"
          >
            ×
          </text>
        ) : null,
      )}

      {/* held frets */}
      {taps.map((t, s) =>
        t > 0 ? (
          <circle
            key={s}
            cx={cellX(t)}
            cy={rowY(s)}
            r="7"
            fill="var(--accent-500)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
        ) : null,
      )}

      {/* click hotspots (fret 0 = the marker zone toggling open/mute) */}
      {taps.map((_, s) =>
        Array.from({ length: BOARD_FRETS + 1 }, (_, f) => (
          <rect
            key={`${s}-${f}`}
            x={f === 0 ? 0 : BX + (f - 1) * BF}
            y={rowY(s) - BS / 2}
            width={f === 0 ? BX - 4 : BF}
            height={BS}
            fill="transparent"
            style={{ cursor: "pointer" }}
            onClick={() => onTap(s, f)}
          />
        )),
      )}
    </svg>
  );
}

// ---- API helpers ----

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, init);
  const data = (await res.json().catch(() => null)) as
    | (T & { ok: boolean; error?: string })
    | null;
  if (!res.ok || !data?.ok)
    throw new Error(data?.error ?? `http_${res.status}`);
  return data;
}

// ---- Window ----

export function ChordsWindow() {
  const [tab, setTab] = useState("name");

  // chord lookup by name
  const [input, setInput] = useState("");
  const [match, setMatch] = useState<ChordMatch | null>(null);
  const [posIndex, setPosIndex] = useState(0);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // reverse lookup on the fretboard
  const [taps, setTaps] = useState<number[]>([-1, -1, -1, -1, -1, -1]);
  const [chosenName, setChosenName] = useState<string | null>(null);

  // current sheet
  const [sheetName, setSheetName] = useState("未命名图谱");
  const [sheetChords, setSheetChords] = useState<SheetChord[]>([]);
  const [sheetId, setSheetId] = useState<string | null>(null);
  const [bpm, setBpm] = useState(90);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const playTimer = useRef<number | null>(null);

  // persistence
  const [savedSheets, setSavedSheets] = useState<SheetMeta[]>([]);
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) ?? "",
  );
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    api<{ sheets: SheetMeta[] }>("/api/sheets")
      .then((d) => setSavedSheets(d.sheets))
      .catch(() => {});
    return stopSheet;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function flash(msg: string) {
    setStatus(msg);
    window.setTimeout(() => setStatus((s) => (s === msg ? null : s)), 2500);
  }

  async function lookup() {
    if (!input.trim()) return;
    const found = await findChord(input);
    if (!found) {
      setMatch(null);
      setLookupError(
        `没认出「${input}」。试试 C、Am、F#m7、Gsus4、Dmaj7、E7、C/G 这样的写法。`,
      );
      return;
    }
    setLookupError(null);
    setMatch(found);
    setPosIndex(0);
    strumChord(found.positions[0].midi);
  }

  function switchVoicing(delta: number) {
    if (!match) return;
    const next =
      (posIndex + delta + match.positions.length) % match.positions.length;
    setPosIndex(next);
    strumChord(match.positions[next].midi);
  }

  function addToSheet() {
    if (!match) return;
    setSheetChords((s) => [
      ...s,
      { name: match.name, position: match.positions[posIndex] },
    ]);
  }

  const boardMidi = taps.flatMap((f, s) => (f >= 0 ? [STD_TUNING[s] + f] : []));
  const candidates = identifyChord(boardMidi);
  const boardName = chosenName ?? candidates[0] ?? null;

  function tapBoard(s: number, f: number) {
    setChosenName(null);
    setTaps((t) =>
      t.map((v, i) =>
        i !== s ? v : f === 0 ? (v === 0 ? -1 : 0) : v === f ? -1 : f,
      ),
    );
  }

  function clearBoard() {
    setChosenName(null);
    setTaps([-1, -1, -1, -1, -1, -1]);
  }

  // Convert absolute fret positions to the diagram's baseFret-relative form.
  function addBoardToSheet() {
    if (!boardName || boardMidi.length < 2) return;
    const pressed = taps.filter((f) => f > 0);
    const baseFret =
      pressed.length === 0 || Math.max(...pressed) <= 4 ? 1 : Math.min(...pressed);
    setSheetChords((s) => [
      ...s,
      {
        name: boardName,
        position: {
          frets: taps.map((f) => (f <= 0 ? f : f - baseFret + 1)),
          fingers: [0, 0, 0, 0, 0, 0],
          baseFret,
          barres: [],
          midi: boardMidi,
        },
      },
    ]);
  }

  function removeChord(i: number) {
    stopSheet();
    setSheetChords((s) => s.filter((_, j) => j !== i));
  }

  function moveChord(i: number, delta: number) {
    setSheetChords((s) => {
      const j = i + delta;
      if (j < 0 || j >= s.length) return s;
      const next = [...s];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function stopSheet() {
    if (playTimer.current) window.clearTimeout(playTimer.current);
    playTimer.current = null;
    setPlayingIndex(null);
  }

  // Play the sheet: one strum per chord, two beats each.
  function playSheet() {
    stopSheet();
    const chords = sheetChords;
    const stepMs = (60 / bpm) * 2 * 1000;
    const step = (i: number) => {
      if (i >= chords.length) {
        stopSheet();
        return;
      }
      setPlayingIndex(i);
      strumChord(chords[i].position.midi);
      playTimer.current = window.setTimeout(() => step(i + 1), stepMs);
    };
    step(0);
  }

  function newSheet() {
    stopSheet();
    setSheetId(null);
    setSheetName("未命名图谱");
    setSheetChords([]);
  }

  async function loadSheet(id: string) {
    try {
      const { sheet } = await api<{
        sheet: { id: string; name: string; chords: SheetChord[] };
      }>(`/api/sheets/${id}`);
      stopSheet();
      setSheetId(sheet.id);
      setSheetName(sheet.name);
      setSheetChords(sheet.chords);
    } catch {
      flash("加载失败");
    }
  }

  async function saveSheet() {
    const id = sheetId ?? `s${Date.now().toString(36)}`;
    try {
      await api(`/api/sheets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: sheetName, chords: sheetChords }),
      });
      setSheetId(id);
      const { sheets } = await api<{ sheets: SheetMeta[] }>("/api/sheets");
      setSavedSheets(sheets);
      flash("已保存到云端 ✓");
    } catch (e) {
      flash(
        e instanceof Error && e.message === "unauthorized"
          ? "口令不对，保存被拒绝"
          : "保存失败",
      );
    }
  }

  async function deleteSheet() {
    if (!sheetId) return;
    try {
      await api(`/api/sheets/${sheetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedSheets((s) => s.filter((x) => x.id !== sheetId));
      newSheet();
      flash("已删除");
    } catch (e) {
      flash(
        e instanceof Error && e.message === "unauthorized"
          ? "口令不对，删除被拒绝"
          : "删除失败",
      );
    }
  }

  const pos = match?.positions[posIndex];

  const nameTab = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          placeholder="输入和弦名，如 Am7、F#m、Gsus4、C/G…"
        />
        <Button variant="primary" onClick={lookup} className="w-18">
          生成
        </Button>
      </div>
      {lookupError && (
        <p className="m-0 text-body-sm text-[#d70015]">{lookupError}</p>
      )}

      {match && pos && (
        <div
          className="flex items-center gap-3 rounded-aqua-md p-3"
          style={{
            background: "var(--surface-inset)",
            boxShadow: "var(--bevel-field)",
          }}
        >
          <ChordDiagram position={pos} width={120} showFingers />
          <div className="flex flex-1 flex-col gap-2">
            <div className="font-chrome text-[26px] font-bold leading-none">
              {match.name}
            </div>
            <div className="flex items-center gap-1 text-body-sm text-secondary-ink">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => switchVoicing(-1)}
              >
                ‹
              </Button>
              把位 {posIndex + 1}/{match.positions.length}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => switchVoicing(1)}
              >
                ›
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => strumChord(pos.midi)}>
                ♪ 试听
              </Button>
              <Button size="sm" variant="primary" onClick={addToSheet}>
                ＋ 添加到图谱
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const boardTab = (
    <div className="flex flex-col gap-2">
      <div
        className="rounded-aqua-md px-1 py-2"
        style={{
          background: "var(--surface-inset)",
          boxShadow: "var(--bevel-field)",
        }}
      >
        <Fretboard taps={taps} onTap={tapBoard} />
      </div>
      <p className="m-0 text-body-xs text-secondary-ink">
        在品格上点出按法（标准调弦），点最左侧切换空弦 ○ / 闷音 ×。
      </p>

      {boardMidi.length >= 2 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="whitespace-nowrap text-body-sm text-secondary-ink">
            这是：
          </span>
          {candidates.length === 0 && (
            <span className="text-body-sm">没认出来 —— 换个按法试试</span>
          )}
          {candidates.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setChosenName(n)}
              className="cursor-pointer rounded-aqua-sm border-none px-2 py-0.5 font-chrome text-body-sm"
              style={{
                background:
                  n === boardName ? "var(--accent-500)" : "var(--gray-200)",
                color:
                  n === boardName
                    ? "var(--text-on-accent)"
                    : "var(--text-primary)",
                boxShadow: "var(--bevel-raised)",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      ) : (
        <p className="m-0 text-body-sm text-secondary-ink">
          至少按出两个音才能识别和弦。
        </p>
      )}

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={() => strumChord(boardMidi)}
          disabled={boardMidi.length === 0}
        >
          ♪ 试听
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={addBoardToSheet}
          disabled={!boardName || boardMidi.length < 2}
        >
          ＋ 添加到图谱
        </Button>
        <Button size="sm" variant="ghost" onClick={clearBoard}>
          清空
        </Button>
        <span className="text-body-xs text-secondary-ink">
          {boardMidi.map((m) => midiToName(m)).join(" ")}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-3 font-body text-body-md text-primary-ink">
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "name", label: "查名字", content: nameTab },
          { value: "board", label: "按指板认", content: boardTab },
        ]}
      />

      <Separator />

      {/* sheet */}
      <div className="flex items-center gap-2">
        <Input
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          style={{ fontWeight: 600 }}
        />
        <Button
          size="sm"
          onClick={playingIndex === null ? playSheet : stopSheet}
          disabled={sheetChords.length === 0}
          className="w-18"
        >
          {playingIndex === null ? "▶ 播放" : "■ 停止"}
        </Button>
      </div>

      <div className="flex items-center gap-2 text-body-sm text-secondary-ink">
        <span className="whitespace-nowrap">♩ = {bpm}</span>
        <Slider value={bpm} min={50} max={160} onChange={setBpm} />
        <span className="whitespace-nowrap">每个和弦 2 拍</span>
      </div>

      {sheetChords.length === 0 ? (
        <p className="m-0 py-3 text-center text-body-sm text-secondary-ink">
          图谱还是空的 —— 在上面生成一个和弦，然后「添加到图谱」。
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {sheetChords.map((c, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center rounded-aqua-md px-1 pb-0.5"
              style={{
                background:
                  playingIndex === i
                    ? "var(--accent-100, #d6e8fd)"
                    : "var(--gray-100)",
                boxShadow:
                  playingIndex === i
                    ? "0 0 0 2px var(--accent-500)"
                    : "var(--bevel-raised)",
              }}
            >
              <button
                type="button"
                onClick={() => strumChord(c.position.midi)}
                title="点击试听"
                className="flex cursor-pointer flex-col items-center border-none bg-transparent p-0"
              >
                <span className="pt-1 font-chrome text-body-sm font-semibold">
                  {c.name}
                </span>
                <ChordDiagram position={c.position} width={68} />
              </button>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => moveChord(i, -1)}
                  className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-secondary-ink"
                  title="左移"
                >
                  ◂
                </button>
                <button
                  type="button"
                  onClick={() => removeChord(i)}
                  className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-secondary-ink"
                  title="移除"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => moveChord(i, 1)}
                  className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-secondary-ink"
                  title="右移"
                >
                  ▸
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator />

      {/* persistence */}
      <div className="flex items-center gap-2">
        <Select
          options={savedSheets.map((s) => ({ value: s.id, label: s.name }))}
          value={sheetId ?? undefined}
          onChange={loadSheet}
          placeholder="打开云端图谱…"
        />
        <Button size="sm" onClick={newSheet}>
          新建
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={saveSheet}
          disabled={sheetChords.length === 0 || !sheetName.trim()}
        >
          保存
        </Button>
        {sheetId && (
          <Button size="sm" variant="destructive" onClick={deleteSheet}>
            删除
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 text-body-sm">
        <span className="whitespace-nowrap text-secondary-ink">写入口令</span>
        <Input
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            localStorage.setItem(TOKEN_KEY, e.target.value);
          }}
          placeholder="保存 / 删除需要口令"
          style={{ maxWidth: 180 }}
        />
        {status && (
          <span className="whitespace-nowrap text-secondary-ink">{status}</span>
        )}
      </div>
    </div>
  );
}
