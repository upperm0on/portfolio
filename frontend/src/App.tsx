import { Layout, Section } from './components/layout';
import { Hero } from './components/features/hero';
import { AboutSection } from './components/features/about';
import { ProjectsSection } from './components/features/projects';
import { ContactSection } from './components/features/contact';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <Layout navItems={navItems} backgroundVariant="starfield">
      <Hero
        variant="centered"
        backgroundVariant="starfield"
        showScrollIndicator={true}
        idleTimeout={4000}
      />

      <Section id="about" variant="spacious" data-animate="fade-up" data-delay="0.1">
        <AboutSection />
      </Section>

      <Section id="work" variant="spacious" data-animate="fade-up" data-delay="0.2">
        <ProjectsSection />
      </Section>

      <Section id="contact" variant="spacious" data-animate="fade-up" data-delay="0.3">
        <ContactSection />
      </Section>
    </Layout>
  );
}

export default App;

