import Link from "next/link";

const navItems = [
  { label: "Главная", href: "#top" },
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Этапы работы", href: "#workflow" },
  { label: "Контакты", href: "#contacts" },
];

type SiteHeaderProps = {
  /* На внутренних страницах якоря ведут на главную ("/#services") */
  onSubpage?: boolean;
};

export default function SiteHeader({ onSubpage = false }: SiteHeaderProps) {
  const linkClass =
    "toolbar-link rounded-md px-5 py-2 text-xs font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#2d63fc]";

  return (
    <header className="fixed left-5 right-5 top-4 z-50 rounded-[26px] border border-[#0b0b0b]/10 bg-[#f1f8ff]/78 px-5 py-3 shadow-[0_6px_20px_rgba(11,11,11,0.08)] backdrop-blur-md sm:left-8 sm:right-8 lg:left-12 lg:right-12">
      <div className="relative mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4">
        <Link
          href={onSubpage ? "/" : "#top"}
          className="text-2xl font-black uppercase leading-none outline-none transition hover:text-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
          aria-label="Арсений, перейти к началу страницы"
        >
          Арсений
        </Link>

        <nav
          aria-label="Основная навигация"
          className="absolute left-1/2 hidden -translate-x-1/2 rounded-lg bg-[#0b0b0b] p-1 shadow-sm md:flex"
        >
          {navItems.map((item, index) => {
            const isRoute = !item.href.startsWith("#");
            const isActive = onSubpage ? isRoute : index === 0;

            if (isRoute) {
              return (
                <Link key={item.href} href={item.href} data-active={isActive ? "true" : "false"} className={linkClass}>
                  {item.label}
                </Link>
              );
            }

            return (
              <a
                key={item.href}
                href={onSubpage ? `/${item.href}` : item.href}
                data-active={isActive ? "true" : "false"}
                className={linkClass}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href={onSubpage ? "/#contacts" : "#contacts"} className="btn-ghost btn-sm">
          {"Связаться"}
          <span className="btn-arrow" aria-hidden="true">{"↗"}</span>
        </a>
      </div>
    </header>
  );
}
