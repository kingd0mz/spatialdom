import Container from './Container';

function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <Container className="flex flex-col gap-3 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Spatialdom © 2026</p>
        <p>Everything happens somewhere.</p>
      </Container>
    </footer>
  );
}

export default Footer;
