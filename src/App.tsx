import { useEffect, useRef, useState, type FormEvent } from 'react';
import livingRoom from './assets/images/living-room.jpg';
import kitchen from './assets/images/kitchen.jpg';
import basement from './assets/images/basement.jpg';
import atticStorage from './assets/images/attic-storage.jpg';
import closet from './assets/images/closet.jpg';
import brandLogo from './assets/images/picture-it-painted-logo.png';
import westIslandMap from './assets/images/west-island-map.png';

const phone = '514-299-5384';
const email = 'pictureitpainted@gmail.com';

const services = [
  { title: 'Painting & wall finishing', items: 'Painting · plastering · wallpaper' },
  { title: 'Renovations & finishing', items: 'Demolition · framing · drywall · moldings · crown molding' },
  { title: 'Installations & repairs', items: 'Storage installations · handyman repairs' },
];

const projects = [
  { image: livingRoom, title: 'Interior finishing', alt: 'Bright living room with finished walls and hardwood flooring' },
  { image: kitchen, title: 'Kitchen update', alt: 'Kitchen with white cabinetry and finished walls' },
  { image: basement, title: 'Basement renovation', alt: 'Finished basement living area' },
  { image: atticStorage, title: 'Attic storage', alt: 'Custom storage shelving fitted into an attic' },
  { image: closet, title: 'Closet installation', alt: 'Built-in closet storage with shelving and hanging space' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <div className="topline"><div className="shell topline-inner"><a href={`tel:${phone.replaceAll('-', '')}`}>{phone}</a></div></div>
    <header className="site-header">
      <div className="shell header-inner">
        <a href="#top" className="brand" aria-label="Picture It Painted home"><img src={brandLogo} alt="Picture It Painted" /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Request an estimate <Arrow /></a>
        </nav>
      </div>
    </header>
  </>;
}

function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Estimate request: ${data.get('project') || 'Home project'}`);
    const body = encodeURIComponent([
      `Name: ${data.get('name')}`,
      `Email: ${data.get('reply')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Project: ${data.get('project')}`,
      `Address or area: ${data.get('area') || 'Not provided'}`,
      '',
      String(data.get('details') || ''),
    ].join('\n'));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return <form className="estimate-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label><label>Email address<input name="reply" type="email" autoComplete="email" required placeholder="you@example.com" /></label></div>
    <div className="form-row"><label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="514-555-0123" /></label><label>What would you like done?<select name="project" defaultValue="" required><option value="" disabled>Select a service</option><option>Painting or plastering</option><option>Drywall or finishing</option><option>Renovation or remodeling</option><option>Storage installation</option><option>Handyman repair</option><option>Other</option></select></label></div>
    <label>Project address or area <span>(optional)</span><input name="area" autoComplete="street-address" placeholder="Pointe-Claire or nearby" /></label>
    <label>Tell us a little about the project<textarea name="details" rows={4} required placeholder="What would you like to update? Include any timing details that would help." /></label>
    <button className="button button-coral" type="submit">Request an estimate <Arrow /></button>
    <p className="form-note" aria-live="polite">{submitted ? 'Your email app should open with the project details filled in.' : 'The form opens a prefilled email for you to review and send.'}</p>
  </form>;
}

export function App() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const galleryTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activePhoto === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lightboxCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowLeft') setActivePhoto(index => index === null ? null : (index + projects.length - 1) % projects.length);
      if (event.key === 'ArrowRight') setActivePhoto(index => index === null ? null : (index + 1) % projects.length);
      if (event.key === 'Tab') {
        const controls = document.querySelectorAll<HTMLElement>('.lightbox-dialog button:not([disabled])');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (!document.querySelector('.lightbox-dialog')) galleryTriggerRef.current?.focus();
    };
  }, [activePhoto]);

  return <>
    <Header />
    <main id="top">
      <section className="hero shell">
        <div className="hero-copy">
          <h1>Painting and home improvements for the <span>West Island.</span></h1>
          <p className="hero-lede">Painting, plastering, renovations and repairs for homes in Pointe-Claire and the West Island.</p>
          <div className="hero-actions"><a className="button button-coral" href="#contact">Request an estimate <Arrow /></a><a className="text-link" href="#projects">Explore project photos <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-visual">
          <img className="hero-photo" src={kitchen} alt="Renovated kitchen with fresh white cabinetry and bright natural light" />
        </div>
      </section>

      <section className="service-ribbon" aria-label="Local business details"><div className="shell ribbon-inner"><span>Based in Pointe-Claire</span><a href={`tel:${phone.replaceAll('-', '')}`}>Call {phone} <Arrow /></a></div></section>

      <section className="services section-pad" id="services">
        <div className="shell">
          <div className="section-intro"><h2>Painting, finishing<br/>and <span>home repairs.</span></h2></div>
          <div className="service-list">{services.map((service) => <article className="service-row" key={service.title}><h3>{service.title}</h3><p>{service.items}</p><a href="#contact" aria-label={`Ask about ${service.title}`}>↗</a></article>)}</div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="shell">
          <div className="projects-heading"><h2>Project photos</h2></div>
          <div className="project-grid">{projects.map((project, index) => <figure className={`project-card project-${index + 1}`} key={project.title}><button className="project-image" type="button" aria-label={`Open ${project.title} photo`} onClick={(event) => { galleryTriggerRef.current = event.currentTarget; setActivePhoto(index); }}><img src={project.image} alt={project.alt} loading="lazy"/></button><figcaption><h3>{project.title}</h3></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="review-section" aria-label="Customer review">
        <div className="shell review-layout"><blockquote>“We hired Picture It Painted to renovate our garage and could not be happier with the finished product!”</blockquote><p className="review-attribution">Elias M. <span className="review-source">Google review · <a href="https://www.google.com/maps/place/?q=place_id:ChIJfyQJ_0E8yUwRfVGwno4gM4M" target="_blank" rel="noreferrer">See all 10 reviews ↗</a></span></p></div>
      </section>

      <section className="local-section" id="about"><div className="shell local-layout"><div className="local-image"><img src={westIslandMap} alt="Schematic map of Montréal Island’s west end, with Pointe-Claire marked west of Dorval." loading="lazy"/></div><div className="local-copy"><h2>Local to<br/><span>the West Island.</span></h2><p>Based at 137 Newton Square in Pointe-Claire. Call to confirm whether your address is in the service area.</p><a className="text-link" href="https://maps.google.com/?q=137+Newton+Square+Pointe-Claire+QC+H9R+5H2" target="_blank" rel="noreferrer">Find us in Pointe-Claire <Arrow /></a></div></div></section>

      <section className="contact-section" id="contact"><div className="shell contact-layout"><div className="contact-copy"><h2>Let’s talk<br/>about your <span>project.</span></h2><p>Call or email us, or send a short project description below.</p><div className="contact-direct"><a href={`tel:${phone.replaceAll('-', '')}`}><span>CALL</span><b>{phone}</b><Arrow /></a><a href={`mailto:${email}`}><span>EMAIL</span><b>{email}</b><Arrow /></a><div><span>VISIT</span><b>137 Newton Square<br/>Pointe-Claire, QC H9R 5H2</b></div></div></div><div className="form-panel"><div className="form-heading"><h3>Request an estimate</h3></div><EstimateForm /></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell footer-main"><a href="#top" className="footer-brand"><img src={brandLogo} alt="Picture It Painted" /></a><p>Painting and home improvements<br/>Pointe-Claire, Quebec</p><a href="#top" className="back-top">BACK TO TOP ↑</a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Picture It Painted</span><span>Serving Pointe-Claire and the West Island</span></div></footer>
    {activePhoto !== null && <div className="lightbox-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePhoto(null); }}><div className="lightbox-dialog" role="dialog" aria-modal="true" aria-label={`${projects[activePhoto].title} photo`}><button ref={lightboxCloseRef} className="lightbox-close" type="button" aria-label="Close photo" onClick={() => setActivePhoto(null)}>×</button><button className="lightbox-prev" type="button" aria-label="Previous photo" onClick={() => setActivePhoto(index => index === null ? null : (index + projects.length - 1) % projects.length)}>‹</button><img className="lightbox-image" src={projects[activePhoto].image} alt={projects[activePhoto].alt}/><button className="lightbox-next" type="button" aria-label="Next photo" onClick={() => setActivePhoto(index => index === null ? null : (index + 1) % projects.length)}>›</button><p className="lightbox-caption">{projects[activePhoto].title}</p></div></div>}
  </>;
}
