import Image from "next/image";
import Link from "next/link";
import { shopTime, type Service } from "@/config/services";
import { imagesByCategory } from "@/lib/gallery";
import s from "./service-plate.module.css";

/**
 * One service as a slanted plate linking to its page. On hover (or focus) a
 * layer wipes across on the slant: a car from that service's gallery folder
 * where one exists, plain navy where it doesn't yet. Drop a photo into the
 * folder and the plate picks it up on the next build.
 */
export function ServicePlate({ service, sizes }: { service: Service; sizes: string }) {
  const image = imagesByCategory(service.galleryCategory)[0];

  return (
    <Link href={`/services/${service.slug}`} className={`plate ${s.service}`}>
      <span className={s.reveal} aria-hidden>
        {image && (
          <Image
            src={image.src}
            alt=""
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            className={s.revealImage}
          />
        )}
      </span>
      <span className={s.name}>{service.name}</span>
      <span className={s.line}>{service.tagline}</span>
      <span className={s.time}>Usually {shopTime(service).toLowerCase()}</span>
    </Link>
  );
}
