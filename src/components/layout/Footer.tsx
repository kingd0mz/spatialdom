import Container from './Container';

function Footer() {
  return (
    <footer className="border-t border-border-subtle py-8">
      <Container className="flex flex-col gap-3 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Spatialdom © 2026</p>
        <p>Everything happens somewhere.</p>
      </Container>
    </footer>
  );
}

export default Footer;
