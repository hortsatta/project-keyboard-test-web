import { Link } from 'react-router-dom';

import { pageRoutes } from '#/core/config/page-routes.config';
import { BaseScene } from '#/base/components/base-scene.component';
import { BaseSEO } from '#/base/components/base-seo.component';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Typen';
const APP_EMAIL = import.meta.env.VITE_APP_EMAIL;

export function StaticTermsOfServicePage() {
  return (
    <>
      <BaseSEO title={pageRoutes.termsOfService.title} />
      <BaseScene
        className='page-content'
        title={pageRoutes.termsOfService.title}
      >
        <ol>
          <li>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using {APP_TITLE} ("the Website"), you agree to
              comply with and be bound by these Terms of Service. If you do not
              agree to these terms, you should not use the Website.
            </p>
          </li>
          <li>
            <h2>Changes to Terms</h2>
            <p>
              {APP_TITLE} reserves the right to modify these Terms of Service at
              any time. Any changes will be effective immediately upon posting
              on the Website. Your continued use of the Website following the
              posting of changes constitutes your acceptance of such changes.
            </p>
          </li>
          <li>
            <h2>Use of the Website</h2>
            <p>
              You agree to use the Website only for lawful purposes. You are
              prohibited from:
            </p>
            <ul>
              <li>
                Using the Website in any way that violates any applicable
                federal, state, local, or international law or regulation.
              </li>
              <li>
                Attempting to interfere with the proper functioning of the
                Website.
              </li>
              <li>
                Engaging in any activity that could harm the Website or other
                users.
              </li>
            </ul>
          </li>
          <li>
            <h2>Intellectual Property</h2>
            <p>
              All content on the Website, including text, graphics, logos, and
              images, is the property of {APP_TITLE} or its content suppliers
              and is protected by intellectual property laws. You may not
              reproduce, distribute, or create derivative works from any content
              on the Website without express written permission from {APP_TITLE}
              .
            </p>
          </li>
          <li>
            <h2>Third-Party Links</h2>
            <p>
              The Website may contain links to third-party websites. These links
              are provided for your convenience only.
              {APP_TITLE} has no control over the content of these sites and
              assumes no responsibility for their content or your use of them.
            </p>
          </li>
          <li>
            <h2>Disclaimer of Warranties</h2>
            <p>
              The Website is provided on an "as is" and "as available" basis.{' '}
              {APP_TITLE} makes no representations or warranties of any kind,
              express or implied, as to the operation of the Website or the
              information, content, or materials included on the Website. To the
              full extent permissible by applicable law,
              {APP_TITLE} disclaims all warranties, express or implied,
              including but not limited to implied warranties of merchantability
              and fitness for a particular purpose.
            </p>
          </li>
          <li>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall {APP_TITLE}, its affiliates, or their respective
              officers, directors, employees, agents, suppliers, or licensors be
              liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising out of or related to
              your use of the Website, whether based on warranty, contract,
              tort, or any other legal theory, and whether or not {APP_TITLE}{' '}
              has been advised of the possibility of such damages.
            </p>
          </li>
          <li>
            <h2>Privacy Policy</h2>
            <p>
              <span>
                If you use our Services, you must abide by our{' '}
                <Link to='/privacy-policy'>Privacy Policy</Link>. You
                acknowledge that you have read our '
                <Link to='/privacy-policy'>Privacy Policy</Link>' and understand
                that it sets forth how we collect, use, and store your
                information. If you do not agree with our{' '}
                <Link to='/privacy-policy'>Privacy Policy</Link>, then you must
                stop using the Services immediately.
              </span>
              <span>
                Any person, entity, or service collecting data from the Services
                must comply with our{' '}
                <Link to='/privacy-policy'>Privacy Policy</Link>.
              </span>
              <span>
                Misuse of any User's Personal Information is prohibited.
              </span>
            </p>
          </li>
          <li>
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless
              {APP_TITLE}, its affiliates, and their respective officers,
              directors, employees, agents, suppliers, and licensors from and
              against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees (including reasonable attorneys'
              fees) arising out of or relating to your violation of these Terms
              of Service or your use of the Website.
            </p>
          </li>
          <li>
            <h2>Contact</h2>
            <p>
              Contact Information If you have any questions about this Terms,
              please contact us at{' '}
              <a href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</a>
            </p>
          </li>
        </ol>
      </BaseScene>
    </>
  );
}
