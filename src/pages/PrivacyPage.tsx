import Container from '../components/layout/Container';

function PrivacyPage() {
  return (
    <main className="pb-16 pt-32 sm:pt-36">
      <Container className="max-w-4xl">
        <section className="panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <header className="space-y-4">
              <p className="section-label">Privacy</p>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                  Privacy policy
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-text-body sm:text-base">
                  This site is currently frontend-only. It does not ask users to create accounts, submit personal
                  profiles, or send private information through the site itself.
                </p>
              </div>
            </header>

            <div className="space-y-6 text-sm leading-7 text-text-body sm:text-base">
              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-text-primary">Cookies</h2>
                <p>
                  Spatialdom may use basic cookies or similar browser storage in the future to support site
                  functionality, preferences, and advertising integrations. If those features are added, this page
                  should be updated to reflect the actual behavior in use.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-text-primary">Google AdSense</h2>
                <p>
                  Tools pages may include Google AdSense placements in the future. AdSense can use cookies or similar
                  technologies to serve and measure ads. At the moment, this site only includes placeholder areas for
                  future ad slots and does not claim that AdSense is active unless and until it is actually enabled.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-text-primary">Analytics</h2>
                <p>
                  Analytics may be added later to understand basic site usage, performance, and which tools are useful.
                  If analytics are introduced, this policy should be updated with the specific provider and data-handling
                  details.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-text-primary">Contact</h2>
                <p>
                  For privacy-related questions, use the published Spatialdom contact details on the main site.
                </p>
              </section>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default PrivacyPage;
