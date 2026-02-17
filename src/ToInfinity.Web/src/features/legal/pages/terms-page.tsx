import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/layout/footer";
import { LegalHero, LegalSection } from "../components";

const TermsPage = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <Box
        component="main"
        sx={{ width: "100%", pt: { xs: "64px", md: "72px" } }}
      >
        <LegalHero
          title="Terms & Conditions"
          subtitle="Please read these terms carefully before using our platform"
          lastUpdated="February 17, 2026"
        />
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
          <LegalSection title="1. Introduction">
            <Typography>
              Welcome to ToInfinity ("we," "our," or "us"). These Terms and
              Conditions govern your use of our wedding venue and catering
              marketplace platform. By accessing or using ToInfinity, you agree
              to be bound by these terms.
            </Typography>
            <Typography>
              ToInfinity is operated from Portugal and complies with European
              Union data protection regulations, including the General Data
              Protection Regulation (GDPR).
            </Typography>
          </LegalSection>

          <LegalSection title="2. Our Service">
            <Typography>
              <strong>Lead Referral Model:</strong> ToInfinity operates as a
              lead referral marketplace. We connect couples planning their
              weddings with venues and catering service providers.
            </Typography>
            <Typography>
              When you submit an inquiry through our platform:
            </Typography>
            <Box component="ul">
              <li>
                Your contact information and requirements are forwarded to
                specific venues or caterers that match your criteria
              </li>
              <li>
                Venues and caterers contact you directly to provide quotations
                and discuss your needs
              </li>
              <li>
                We facilitate the initial connection but do not participate in
                negotiations or contractual arrangements between you and service
                providers
              </li>
            </Box>
            <Typography>
              <strong>What We Don't Do:</strong> We do not sell, rent, or share
              your personal information with third parties for marketing
              purposes. We do not use advertising partners or tracking networks.
            </Typography>
          </LegalSection>

          <LegalSection title="3. User Accounts">
            <Typography>
              To access certain features, you may need to create an account. You
              are responsible for:
            </Typography>
            <Box component="ul">
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Providing accurate and up-to-date information</li>
            </Box>
          </LegalSection>

          <LegalSection title="4. Service Provider Responsibilities">
            <Typography>
              Venues and caterers using our platform agree to:
            </Typography>
            <Box component="ul">
              <li>Provide accurate information about their services</li>
              <li>Respond to inquiries in a timely and professional manner</li>
              <li>
                Use customer contact information solely for responding to their
                specific inquiry
              </li>
              <li>
                Comply with all applicable laws and regulations in providing
                their services
              </li>
            </Box>
          </LegalSection>

          <LegalSection title="5. Prohibited Activities">
            <Typography>You may not use ToInfinity to:</Typography>
            <Box component="ul">
              <li>
                Submit false, misleading, or fraudulent information or inquiries
              </li>
              <li>Harass, abuse, or harm other users or service providers</li>
              <li>
                Violate any applicable laws, regulations, or third-party rights
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or other
                users' accounts
              </li>
              <li>
                Use automated tools to scrape or collect data from our platform
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of our
                service
              </li>
            </Box>
          </LegalSection>

          <LegalSection title="6. Intellectual Property">
            <Typography>
              All content, features, and functionality on ToInfinity, including
              but not limited to text, graphics, logos, and software, are owned
              by ToInfinity and protected by international copyright, trademark,
              and other intellectual property laws.
            </Typography>
            <Typography>
              Service providers retain ownership of their own content (photos,
              descriptions, etc.) but grant us a license to display it on our
              platform.
            </Typography>
          </LegalSection>

          <LegalSection title="7. Disclaimer of Warranties">
            <Typography>
              ToInfinity is provided "as is" and "as available" without
              warranties of any kind, either express or implied. We do not
              guarantee:
            </Typography>
            <Box component="ul">
              <li>
                The accuracy, completeness, or reliability of venue or catering
                information
              </li>
              <li>
                That venues or caterers will respond to your inquiries or
                fulfill their commitments
              </li>
              <li>Uninterrupted or error-free operation of our platform</li>
              <li>That our service will meet your specific requirements</li>
            </Box>
            <Typography>
              <strong>Important:</strong> We are a referral platform only. The
              contractual relationship for wedding services is directly between
              you and the venue/caterer. We are not responsible for the quality,
              safety, or legality of services provided by third parties listed
              on our platform.
            </Typography>
          </LegalSection>

          <LegalSection title="8. Limitation of Liability">
            <Typography>
              To the maximum extent permitted by law, ToInfinity shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, or goodwill, arising from:
            </Typography>
            <Box component="ul">
              <li>Your use or inability to use our service</li>
              <li>Any conduct or content of third parties on our platform</li>
              <li>
                Unauthorized access to or alteration of your transmissions or
                data
              </li>
              <li>
                Issues arising from services provided by venues or caterers
              </li>
            </Box>
          </LegalSection>

          <LegalSection title="9. Indemnification">
            <Typography>
              You agree to indemnify and hold harmless ToInfinity, its officers,
              directors, employees, and agents from any claims, losses,
              liabilities, damages, costs, or expenses arising from:
            </Typography>
            <Box component="ul">
              <li>Your violation of these Terms and Conditions</li>
              <li>Your violation of any rights of another party</li>
              <li>Your use of the ToInfinity platform</li>
            </Box>
          </LegalSection>

          <LegalSection title="10. Privacy and Data Protection">
            <Typography>
              Your privacy is important to us. Our collection, use, and
              protection of your personal data is governed by our Privacy
              Policy, which is incorporated into these terms by reference.
            </Typography>
            <Typography>
              As a European-based company, we comply with GDPR and respect your
              data rights, including the right to access, rectify, delete, and
              port your data.
            </Typography>
          </LegalSection>

          <LegalSection title="11. Modifications to Terms">
            <Typography>
              We reserve the right to modify these Terms and Conditions at any
              time. We will notify users of material changes by posting the
              updated terms on our platform and updating the "Last updated"
              date.
            </Typography>
            <Typography>
              Your continued use of ToInfinity after changes are posted
              constitutes acceptance of the modified terms.
            </Typography>
          </LegalSection>

          <LegalSection title="12. Termination">
            <Typography>
              We may suspend or terminate your access to ToInfinity at any time,
              without prior notice, for conduct that we believe violates these
              terms or is harmful to other users, us, or third parties.
            </Typography>
            <Typography>
              You may terminate your account at any time by contacting us. Upon
              termination, your right to use the platform will immediately
              cease.
            </Typography>
          </LegalSection>

          <LegalSection title="13. Governing Law">
            <Typography>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of Portugal and the European Union. Any
              disputes arising from these terms or your use of ToInfinity shall
              be subject to the exclusive jurisdiction of the courts of
              Portugal.
            </Typography>
          </LegalSection>

          <LegalSection title="14. Contact Information">
            <Typography>
              If you have questions about these Terms and Conditions, please
              contact us at:
            </Typography>
            <Typography>
              <strong>ToInfinity</strong>
              <br />
              Email: legal@toinfinity.com
              <br />
              Address: [Your Company Address]
            </Typography>
          </LegalSection>

          <Box sx={{ mt: 6, pt: 4, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              By using ToInfinity, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default TermsPage;
