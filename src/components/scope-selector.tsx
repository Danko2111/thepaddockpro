import Link from "next/link";
import s from "./scope-selector.module.css";

/**
 * The scopes a service comes in, as a chooser: pick one from the list and it
 * opens in the panel with a way to ask about it. No JavaScript: each tab is a
 * visually hidden radio button and CSS shows the matching panel, so it works
 * before hydration, arrow keys move between scopes, and every option's text
 * is in the HTML for search engines.
 */
export function ScopeSelector({ options }: { options: { name: string; detail: string }[] }) {
  return (
    <div className={s.selector}>
      <div className={s.tabs} role="radiogroup" aria-label="Scope">
        {options.map((option, i) => (
          <label key={option.name} className={s.tab}>
            <input type="radio" name="scope" defaultChecked={i === 0} className="sr-only" />
            <span>{option.name}</span>
          </label>
        ))}
      </div>
      <div className={s.panels}>
        {options.map((option) => (
          <div key={option.name} className={s.panel}>
            <h3 className={s.panelName}>{option.name}</h3>
            <p className={s.panelDetail}>{option.detail}</p>
            <Link href="/contact" className="btn btn-light mt-8">
              Ask about {option.name.toLowerCase()}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
