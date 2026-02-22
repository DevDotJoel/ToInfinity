import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PublicLayout from '@/components/layout/public-layout';
import LegalHero from '@/components/legal/legal-hero';
import LegalSection from '@/components/legal/legal-section';

export const metadata: Metadata = {
  title: 'Privacy Policy - TooInfinity',
  description: 'TooInfinity privacy policy and data protection information.',
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
        <LegalHero
          title="Privacy Policy"
          subtitle="Your privacy matters. Learn how we protect your personal data."
          lastUpdated="February 17, 2026"
        />
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
          <LegalSection title="1. Introduction">
            <Typography>
              ToInfinity ("we," "our," or "us") is committed to protecting your
              privacy and personal data. This Privacy Policy explains how we
              collect, use, store, and protect your information when you use our
              wedding venue and catering marketplace platform.
            </Typography>
            <Typography>
              As a company operating in Portugal, we comply with the European
              Union&apos;s General Data Protection Regulation (GDPR) and respect all
              your data protection rights.
            </Typography>
            <Typography>
              <strong>Our Privacy-First Approach:</strong> We do not use
              advertising networks, tracking pixels, or third-party analytics
              that compromise your privacy. We collect only the data necessary
              to provide our service.
            </Typography>
          </LegalSection>

          <LegalSection title="2. Data Controller">
            <Typography>
              ToInfinity is the data controller responsible for your personal
              data. You can contact us at:
            </Typography>
            <Typography>
              <strong>ToInfinity</strong>
              <br />
              Email: privacy@toinfinity.com
              <br />
              Address: [Your Company Address]
            </Typography>
          </LegalSection>

          <LegalSection title="3. What Data We Collect">
            <Typography>
              We collect minimal personal data necessary to operate our
              platform:
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>Account Information (when you register):</strong>
            </Typography>
            <Box component="ul">
              <li>Name</li>
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Account preferences</li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>
                Inquiry Information (when you contact venues/caterers):
              </strong>
            </Typography>
            <Box component="ul">
              <li>Name and contact details</li>
              <li>Wedding date and location</li>
              <li>Number of guests</li>
              <li>Budget and service requirements</li>
              <li>Any additional details you provide in your inquiry</li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>
                Service Provider Information (venues and caterers):
              </strong>
            </Typography>
            <Box component="ul">
              <li>Business name and contact information</li>
              <li>Service descriptions and pricing</li>
              <li>Photos and promotional materials</li>
              <li>Business registration details</li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>Technical Data:</strong>
            </Typography>
            <Box component="ul">
              <li>IP address (for security purposes only)</li>
              <li>Browser type and version</li>
              <li>
                Device information (for providing appropriate mobile/desktop
                experience)
              </li>
              <li>Pages visited and actions taken (for service improvement)</li>
            </Box>
          </LegalSection>

          <LegalSection title="4. How We Use Your Data">
            <Typography>
              We use your personal data only for the following purposes:
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>To Provide Our Service:</strong>
            </Typography>
            <Box component="ul">
              <li>Creating and managing your account</li>
              <li>Forwarding your inquiries to relevant venues and caterers</li>
              <li>
                Facilitating communication between couples and service providers
              </li>
              <li>Processing and displaying venue/catering listings</li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>To Improve Our Platform:</strong>
            </Typography>
            <Box component="ul">
              <li>Understanding which features are most useful</li>
              <li>Identifying and fixing technical issues</li>
              <li>Improving user experience and interface design</li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>To Communicate With You:</strong>
            </Typography>
            <Box component="ul">
              <li>Responding to your questions and support requests</li>
              <li>
                Sending essential service updates (e.g., changes to our terms)
              </li>
              <li>
                Confirming successful inquiry submissions (with your consent)
              </li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>For Security and Legal Compliance:</strong>
            </Typography>
            <Box component="ul">
              <li>Preventing fraud and abuse</li>
              <li>Protecting our platform and users from security threats</li>
              <li>Complying with legal obligations</li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              <strong>What We Don&apos;t Do:</strong>
            </Typography>
            <Box component="ul">
              <li>Sell your personal data to third parties</li>
              <li>Use your data for advertising or marketing purposes</li>
              <li>Share your data with advertising networks or data brokers</li>
              <li>Track your behavior across other websites</li>
              <li>Create detailed profiles for targeted advertising</li>
            </Box>
          </LegalSection>

          <LegalSection title="5. Legal Basis for Processing (GDPR)">
            <Typography>
              Under GDPR, we process your personal data based on:
            </Typography>
            <Box component="ul">
              <li>
                <strong>Contract:</strong> Processing necessary to provide our
                service (lead referral)
              </li>
              <li>
                <strong>Consent:</strong> When you explicitly agree (e.g., to
                receive non-essential communications)
              </li>
              <li>
                <strong>Legitimate Interest:</strong> Improving our service and
                preventing fraud, while respecting your privacy
              </li>
              <li>
                <strong>Legal Obligation:</strong> When required by law
              </li>
            </Box>
          </LegalSection>

          <LegalSection title="6. Who We Share Your Data With">
            <Typography>
              We share your data only in these limited circumstances:
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>With Venues and Caterers (Lead Referral):</strong>
            </Typography>
            <Typography>
              When you submit an inquiry, we forward your contact information
              and requirements to the specific venue(s) or caterer(s) you&apos;re
              interested in. This is the core function of our platform.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>With Service Providers (Processors):</strong>
            </Typography>
            <Box component="ul">
              <li>
                <strong>Hosting Provider:</strong> To store our platform and
                database securely
              </li>
              <li>
                <strong>Email Service:</strong> To send account-related and
                inquiry confirmation emails
              </li>
              <li>
                <strong>Payment Processor:</strong> If you&apos;re a venue/caterer
                paying for enhanced listings
              </li>
            </Box>
            <Typography>
              All service providers are contractually bound to protect your data
              and use it only for the specific services they provide to us.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>For Legal Reasons:</strong>
            </Typography>
            <Typography>
              We may disclose your data if required by law, court order, or to
              protect our rights, property, or safety, or that of our users or
              the public.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>We Never Share Data With:</strong>
            </Typography>
            <Box component="ul">
              <li>Advertising networks</li>
              <li>Data brokers or list sellers</li>
              <li>Analytics companies that track you across websites</li>
              <li>Social media platforms for advertising purposes</li>
            </Box>
          </LegalSection>

          <LegalSection title="7. Data Retention">
            <Typography>
              We retain your personal data only as long as necessary:
            </Typography>
            <Box component="ul">
              <li>
                <strong>Account Data:</strong> Until you delete your account,
                plus 30 days for backup purposes
              </li>
              <li>
                <strong>Inquiry Data:</strong> For 2 years after submission, to
                facilitate follow-up and service improvement
              </li>
              <li>
                <strong>Technical Logs:</strong> For 90 days, for security and
                troubleshooting
              </li>
              <li>
                <strong>Legal Records:</strong> As required by law (typically 7
                years for financial records)
              </li>
            </Box>
            <Typography>
              After these periods, data is securely deleted or anonymized.
            </Typography>
          </LegalSection>

          <LegalSection title="8. Your Data Rights (GDPR)">
            <Typography>
              Under GDPR, you have the following rights regarding your personal
              data:
            </Typography>

            <Box component="ul">
              <li>
                <strong>Right of Access:</strong> Request a copy of all personal
                data we hold about you
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correct inaccurate or
                incomplete data
              </li>
              <li>
                <strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong>{' '}
                Request deletion of your data, subject to legal obligations
              </li>
              <li>
                <strong>Right to Restriction:</strong> Limit how we process your
                data in certain circumstances
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in
                a structured, machine-readable format
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing based on
                legitimate interests
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Where processing is
                based on consent, withdraw it at any time
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> Submit a complaint
                to your national data protection authority (in Portugal: CNPD)
              </li>
            </Box>

            <Typography sx={{ mt: 2 }}>
              To exercise these rights, contact us at privacy@toinfinity.com. We
              will respond within 30 days.
            </Typography>
          </LegalSection>

          <LegalSection title="9. Data Security">
            <Typography>
              We implement appropriate technical and organizational measures to
              protect your data:
            </Typography>
            <Box component="ul">
              <li>Encryption of data in transit (HTTPS/TLS) and at rest</li>
              <li>Strong password requirements and secure authentication</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls limiting who can view your data</li>
              <li>Regular backups with encryption</li>
              <li>Incident response procedures</li>
            </Box>
            <Typography>
              While we take security seriously, no system is 100% secure. We
              encourage you to use strong passwords and protect your account
              credentials.
            </Typography>
          </LegalSection>

          <LegalSection title="10. International Data Transfers">
            <Typography>
              Your data is primarily stored and processed within the European
              Union. If we use service providers outside the EU, we ensure they
              provide adequate protection through:
            </Typography>
            <Box component="ul">
              <li>
                Standard Contractual Clauses approved by the EU Commission
              </li>
              <li>
                Adequacy decisions (transfers to countries deemed to have
                adequate protection)
              </li>
              <li>Other legally approved transfer mechanisms</li>
            </Box>
          </LegalSection>

          <LegalSection title="11. Children's Privacy">
            <Typography>
              ToInfinity is not intended for use by individuals under 18 years
              of age. We do not knowingly collect personal data from children.
              If we become aware that we have collected data from a child
              without parental consent, we will delete it promptly.
            </Typography>
          </LegalSection>

          <LegalSection title="12. Cookies and Tracking">
            <Typography>
              We use only essential cookies necessary for our platform to
              function (e.g., keeping you logged in). We do not use advertising
              or tracking cookies. See our Cookie Policy for details.
            </Typography>
          </LegalSection>

          <LegalSection title="13. Changes to This Policy">
            <Typography>
              We may update this Privacy Policy to reflect changes in our
              practices or legal requirements. We will notify you of material
              changes by email and/or by posting a notice on our platform.
            </Typography>
            <Typography>
              The &quot;Last updated&quot; date at the top indicates when the policy was
              last revised.
            </Typography>
          </LegalSection>

          <LegalSection title="14. Contact Us">
            <Typography>
              If you have questions, concerns, or wish to exercise your data
              rights, please contact:
            </Typography>
            <Typography>
              <strong>ToInfinity Data Protection Team</strong>
              <br />
              Email: privacy@toinfinity.com
              <br />
              Address: [Your Company Address]
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Supervisory Authority (Portugal):</strong>
              <br />
              Comissão Nacional de Proteção de Dados (CNPD)
              <br />
              Website: www.cnpd.pt
            </Typography>
          </LegalSection>

          <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              We believe privacy is a fundamental right. If you have suggestions
              on how we can better protect your privacy, we&apos;d love to hear from
              you.
            </Typography>
          </Box>
        </Container>
      </Box>
    </PublicLayout>
  );
}
