import Script from 'next/script'

type StatcounterProps = {
  project: string
  security: string
}

/** Statcounter's invisible counter. */
export default function Statcounter({ project, security }: StatcounterProps) {
  if (!project || !security) return null

  return (
    <>
      <Script
        id="statcounter-config"
        strategy="afterInteractive"
      >
        {`
          var sc_project=${Number(project)};
          var sc_invisible=1;
          var sc_security="${security}";
          var sc_https=1;
          var sc_remove_link=1;
          var _statcounter = _statcounter || [];
        `}
      </Script>
      <Script
        src="https://www.statcounter.com/counter/counter.js"
        strategy="afterInteractive"
      />
    </>
  )
}
