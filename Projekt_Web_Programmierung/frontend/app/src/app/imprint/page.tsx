import React from 'react';

const ImprintPage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Impressum</h1>
            <br></br>
            <p>
                <strong>Angaben gemäß § 5 TMG:</strong>
            </p>
            <p>
                Max Mustermann<br />
                Musterstraße 1<br />
                12345 Musterstadt
            </p>
            <br></br>
            <p>
                <strong>Kontakt:</strong><br />
                Telefon: +49 01234 56789<br />
                E-Mail: info.test@prismarine-solutions.com
            </p>
            <br></br>
            <p>
                <strong>Umsatzsteuer-ID:</strong><br />
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789
            </p>
            <br></br>
            <p>
                <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
                Max Mustermann<br />
                Musterstraße 1<br />
                12345 Musterstadt
            </p>
            <br></br>
            <p>
                <strong>Haftungsausschluss:</strong><br />
                <strong>Haftung für Inhalte</strong><br />
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <br></br>
            <p>
                <strong>Haftung für Links</strong><br />
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <br></br>
            <p>
                <strong>Urheberrecht</strong><br />
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
        </div>
    );
};

export default ImprintPage;

export function generateMetadata() {
    return {
      title: "Prismarine Solutions",
      description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
    };
}