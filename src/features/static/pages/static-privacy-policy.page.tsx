import { BaseScene } from '#/base/components/base-scene.component';
import { BaseSEO } from '#/base/components/base-seo.component';
import { pageRoutes } from '#/core/config/page-routes.config';

const APP_EMAIL = import.meta.env.VITE_APP_EMAIL;

export function StaticPrivacyPolicyPage() {
  return (
    <>
      <BaseSEO title={pageRoutes.privacyPolicy.title} />
      <BaseScene
        className='page-content'
        title={pageRoutes.privacyPolicy.title}
      >
        <ol>
          <li>
            <h2>Information We Collect</h2>
            <p>
              Since we do not require account creation, the information we
              collect is limited and may include:
            </p>
            <ul>
              <li>
                <b>Personal Information:</b> Any personal information you
                voluntarily provide when contacting us through forms or email.
              </li>
              <li>
                <b>Non-Personal Information:</b> Technical data such as IP
                addresses, browser type, referring/exit pages, and operating
                system collected through cookies and other tracking
                technologies.
              </li>
            </ul>
          </li>
          <li>
            <h2>How We Use Your Information</h2>
            <p>
              The information we collect is used for the following purposes:
            </p>
            <ul>
              <li>
                To respond to your inquiries and provide customer support.
              </li>
              <li>To improve our website's content and functionality.</li>
              <li>
                To monitor and analyze usage patterns and trends to enhance your
                experience on our website.
              </li>
              <li>To protect the security and integrity of our website.</li>
            </ul>
          </li>
          <li>
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect
              non-personal information about your interaction with our website.
              Cookies are small text files stored on your device that help us
              analyze web traffic and improve your browsing experience. You can
              control the use of cookies through your browser settings.
            </p>
          </li>
          <li>
            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or the content of these
              third-party sites. We encourage you to read the privacy policies
              of any third-party sites you visit.
            </p>
          </li>
          <li>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect the personal information we collect against unauthorized
              access, disclosure, alteration, or destruction. However, please be
              aware that no security measures are perfect or impenetrable.
            </p>
          </li>
          <li>
            <h2>Children's Privacy</h2>
            <p>
              Our website is not intended for use by children under the age of
              13. We do not knowingly collect personal information from children
              under 13. If we become aware that we have inadvertently received
              personal information from a child under the age of 13, we will
              delete such information from our records.
            </p>
          </li>
          <li>
            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                Access and review the personal information we hold about you.
              </li>
              <li>
                Request corrections to any inaccurate or incomplete personal
                information.
              </li>
              <li>
                Request the deletion of your personal information, subject to
                certain legal constraints.
              </li>
              <li>
                Opt-out of receiving communications from us by following the
                unsubscribe instructions provided in our emails or contacting us
                directly.
              </li>
            </ul>
          </li>
          <li>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any significant changes
              by posting the new Privacy Policy on our website. Your continued
              use of the website after such changes constitutes your acceptance
              of the revised policy.
            </p>
          </li>
          <li>
            <h2>Contact</h2>
            <p>
              Contact Information If you have any questions about this Privacy
              Policy, please contact us at{' '}
              <a href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</a>
            </p>
          </li>
        </ol>
      </BaseScene>
    </>
  );
}
