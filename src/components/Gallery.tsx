import { GALLERY_KEYS } from '../data/photos';
import { SITE } from '../data/site';
import { ArchFrame } from './ArchFrame';
import { InstagramIcon, TikTokIcon } from './Icons';
import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="gallery-title" kicker="From our table" title="A closer look" />
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {GALLERY_KEYS.map((key, index) => (
            <li key={key} className="even:translate-y-6">
              <Reveal delay={(index % 5) * 60}>
                <ArchFrame>
                  <Photo photoKey={key} sizes="(min-width: 1024px) 200px, (min-width: 768px) 30vw, 46vw" />
                </ArchFrame>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <a href={SITE.instagram} target="_blank" rel="noopener" className="btn-outline">
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
          <a href={SITE.tiktok} target="_blank" rel="noopener" className="btn-outline">
            <TikTokIcon className="h-4 w-4" />
            TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
