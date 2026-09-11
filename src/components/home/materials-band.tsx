import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "../ui/container";

/**
 * Static, not a marquee. The film a shop is certified to install is a fact
 * worth stating plainly — animating it turns a credential into decoration.
 */
export function MaterialsBand() {
  return (
    <section aria-label="Film we install" className="border-b border-hairline bg-asphalt">
      <Container wide>
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-fog">
            {site.credentials[0]}, installing cast film from{" "}
            <span className="text-chalk">3M</span>, <span className="text-chalk">Avery Dennison</span>{" "}
            and <span className="text-chalk">Inozetek</span>.
          </p>
          <Link
            href="/process#materials"
            className="text-sm font-semibold text-cyan underline-offset-4 hover:underline"
          >
            Why these films
          </Link>
        </div>
      </Container>
    </section>
  );
}
