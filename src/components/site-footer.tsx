import { FlickeringGrid } from "@/components/ui/flickering-grid";

const contactLinks = [
  { label: "Telegram", handle: "@username", href: "https://t.me/username", external: true },
  { label: "Behance", handle: "behance.net/username", href: "https://behance.net/username", external: true },
  { label: "Email", handle: "hello@example.com", href: "mailto:hello@example.com", external: false },
];

type SiteFooterProps = {
  /* На внутренних страницах «Наверх» ведёт на главную */
  onSubpage?: boolean;
};

export default function SiteFooter({ onSubpage = false }: SiteFooterProps) {
  return (
    <footer
      id="contacts"
      className="section-band footer-band relative isolate overflow-hidden rounded-t-[26px] border-t border-[#0b0b0b]/12 bg-[#f1f8ff] px-5 pb-10 pt-24 text-[#0b0b0b] sm:px-8 sm:pb-12 sm:pt-32 lg:px-12"
    >
      <FlickeringGrid
        className="footer-grid pointer-events-none absolute inset-0 z-0"
        squareSize={2.4}
        gridGap={16}
        flickerChance={0.14}
        color="#2d63fc"
        maxOpacity={0.32}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1360px]">
        {/* Текст слева, контакт-плитки справа */}
        <div className="footer-lead">
          <h2 className="footer-title">
            {"Есть задача?"}
            <br />
            <em>{"Напиши мне"}</em>
          </h2>

          <div className="footer-tiles">
            {contactLinks.map(({ label, handle, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="footer-tile contact-link"
              >
                <span className="footer-tile-label">{label}</span>
                <span className="footer-tile-handle">{handle}</span>
                <span className="footer-tile-arrow" aria-hidden="true">{"↗"}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>{"© 2026 Арсений"}</span>
          <span className="footer-bottom-loc">{"Графический дизайнер · Trap / Drill visuals"}</span>
          <a href={onSubpage ? "/" : "#top"} className="footer-top-link">
            {"Наверх"} <span aria-hidden="true">{"↑"}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
