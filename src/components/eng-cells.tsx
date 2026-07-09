/* Подсвеченные клетки инженерной сетки на рандомных местах.
   Детерминированный «рандом» от сида: SSR и клиент рендерят одинаково,
   но у каждой карточки (свой сид) — свой набор позиций. Шаг сетки 34px. */

type EngCellsProps = {
  seed: number;
  count?: number;
};

export default function EngCells({ seed, count }: EngCellsProps) {
  let s = seed * 7919 + 104729;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const total = count ?? 3 + Math.floor(rnd() * 3);
  const cells = Array.from({ length: total }, () => ({
    x: Math.floor(rnd() * 26) * 34,
    y: Math.floor(rnd() * 10) * 34,
    a: 0.04 + rnd() * 0.045,
  }));

  return (
    <span className="eng-cells" aria-hidden="true">
      {cells.map((cell, i) => (
        <i key={i} style={{ left: cell.x, top: cell.y, opacity: cell.a }} />
      ))}
    </span>
  );
}
