import UserType from './userType';
import UserStory from './userStory';

type OwaspStoriesProps = {
  stories: UserStory[];
  userType?: UserType;
};
export default class OwaspStories {
  stories = new Set<UserStory>();
  userType: UserType | undefined;
  constructor(params?: OwaspStoriesProps) {
    this.stories = new Set<UserStory>(params?.stories ?? []);
    this.userType = params?.userType;
    this._generateStories();
  }

  listStories(): UserStory[] {
    return Array.from(this.stories);
  }

  private _addStory(story: UserStory | UserStory[]): OwaspStories {
    if (Array.isArray(story)) {
      story.forEach((s) => this.stories.add(s));
    } else {
      this.stories.add(story);
    }
    return this;
  }

  private _generateStories = () => {
    const stories = [
      new UserStory({
        iWant: 'my data must be protected from unintentional disclosure to other customers or external parties.',
        description:
          'Data is segregated by tenant. Administrators and users must be separated by role to prevent unauthorized disclosure or modification. Personally Identifiable Information (Software company RESTRICTED data) must be encrypted-at-rest and must be encrypted in transit over public networks.',
      }),
      new UserStory({
        iWant: 'the application to allow passphrases and/or difficult passwords.',
        description:
          'Verify password entry fields allow, or encourage, the use of passphrases, long passphrases or highly complex passwords. Verify that measures are in place to block the use of commonly chosen passwords and weak passphrases.',
      }),
      new UserStory({
        iWant: 'all connections to an application that contains my user data to be authenticated.',
        description:
          'Verify that all connections to applications that contain customer information or functions are authenticated.',
      }),
      new UserStory({
        iWant: 'password entry and other fields containing sensitive information to disallow caching or auto-complete.',
        description:
          'Verify password and other data entry fields containing RESTRICTED information do not cache or allow auto-complete. An exception may be made for password managers.',
      }),
      new UserStory({
        iWant:
          'the ability to securely change or reset my password without worrying that my account(s) can be hijacked by a malicious party.',
        description:
          'Verify all account identity authentication functions (such as update profile, forgot password, disabled / lost token, help desk or IVR) that might regain access to the account are at least as resistant to attack as the primary authentication mechanism. At a minimum, verify that the changing password functionality includes the old password, the new password, and a password confirmation. Verify that the forgotten password function and other recovery mechanisms do not reveal the current password and that the new password is not sent in clear text to the user. Verify that forgotten password and other recovery paths use a TOTP or other soft token, mobile push, or other offline recovery mechanism. Use of a random value in an e-mail or SMS should be a last resort.',
      }),
      new UserStory({
        iWant:
          'my account credentials to be created, stored and transported securely so that they can’t be guessed, intercepted or reused by an attacker.',
        description:
          'Verify that account passwords are one way hashed with a salt, and there is sufficient work factor to defeat brute force and password hash recovery attacks. Verify that credentials are transported using a suitable encrypted link and that all pages/functions that require a user to enter credentials are done so using an encrypted link.',
      }),
      new UserStory({
        iWant:
          'an additional factor of authentication to protect my accounts from unauthorized access. I want step-up authentication for risky transactions and changes to accounts.',
        description:
          'Users can authenticate using two-factor authentication or other strong authentication, or any similar scheme that provides protection against username + password disclosure. Verify that risk based re-authentication, two factor or transaction signing is in place for high value transactions.',
      }),
      new UserStory({
        iWant:
          'a user logout feature. I need user sessions inactivated after logout and timed out after inactivity or a time limit set by an administrator.',
        description:
          'Sessions are invalidated when the user logs out. Verify that sessions timeout after a specified period of inactivity or after an administratively- configurable maximum time period regardless of activity (an absolute timeout).',
      }),
      new UserStory({
        iWant: 'application sessions must be unique and resistant to hijacking by a malicious actor.',
        description:
          "All successful authentication and re- authentication generates a new session and session id. The session id is never disclosed in URLs, error messages, or logs. This includes verifying that the application does not support URL rewriting of session cookies. Validate that only session ids generated by the application framework are recognized as active by the application. Confirm that session ids are sufficiently long, random and unique across the correct active session base. Session ids stored in cookies must have their path set to an appropriately restrictive value for the application, and authentication session tokens additionally set the 'HttpOnly' and 'secure' attributes. Ensure that the application limits the number of active concurrent sessions and that an active session list is displayed in the account profile or similar of each user. The user should be able to terminate any active session. Verify the user is prompted with the option to terminate all other active sessions after a successful change password process.",
      }),
      new UserStory({
        iWant: 'accounts to only be able to perform those actions or access resources explicitly granted to them.',
        description:
          "The principle of least privilege exists - users should only be able to access functions, data files, URLs, controllers, services, and other resources, for which they possess specific authorization. This implies protection against spoofing and elevation of privilege. Access to sensitive records is restricted, such that only authorized objects or data is accessible to each user (for example, protect against users tampering with a parameter to see or alter another user's account). If the application is multi-tenant, this segregation of users and access must be verified. The application must use strong random anti-CSRF tokens or has another transaction protection mechanism.",
      }),
      new UserStory({
        iWant: 'the application to validate input to be correct and fit for the intended purpose.',
        description: 'Validate all data input from an external entity or client.',
      }),
      new UserStory({
        iWant: 'access to application secret keys managed securely.',
        description:
          'There is an explicit policy for how cryptographic keys are managed (e.g., generated, distributed, revoked, and expired). Verify that this key lifecycle is properly enforced. Ensure that consumers of cryptographic services do not have direct access to key material. Isolate cryptographic processes, including master secrets and consider the use of a virtualized or physical hardware key vault (HSM).',
      }),
      new UserStory({
        iWant: 'a suitable level of entropy in generating keys to prevent attacks.',
        description:
          'Verify that all random numbers, random file names, random GUIDs, and random strings are generated using the cryptographic module’s approved random number generator when these random values are intended to be not guessable by an attacker.',
      }),
      new UserStory({
        iWant:
          'the ability to collect logs in a standard format for a SIEM or other security tool, which contain information such as user and administrative access, but not sensitive information such as passwords or PII.',
        description:
          'The application does not output error messages or stack traces containing sensitive data that could assist an attacker, including session id, software/framework versions and personal information. The application does not log sensitive data as defined under local privacy laws or regulations, organizational sensitive data as defined by a risk assessment, or sensitive authentication data that could assist an attacker, including user’s session identifiers, passwords, hashes, or API tokens. Security logging controls provide the ability to log success and particularly failure events that are identified as security-relevant. Each log event should include necessary information that would allow for a detailed investigation of the timeline when an event happens.',
      }),
      new UserStory({
        iWant:
          'the ability to specify retention policies for certain RESTRICTED or sensitive data so that this data can be deleted at the end of the retention period.',
        description:
          'Verify that there is a method to remove each type of sensitive data from the application at the end of the required retention policy.',
      }),
      new UserStory({
        iWant:
          'the application to detect and alert when there are unauthorized attempts to access my data, login or make changes.',
        description:
          'Access or modifications to sensitive data is logged, if the data is collected under relevant data protection directives or where logging of accesses is required.',
      }),
      new UserStory({
        iWant:
          'the application to provide an audit trail of administrative actions, user modifications or accessing PII.',
        description:
          'Access or modifications to sensitive data is logged, if the data is collected under relevant data protection directives or where logging of accesses is required.',
      }),
      new UserStory({
        iWant:
          'web applications to be resistant to attacks by malicious actors that would impact availability or extract user data and/or credentials.',
        description:
          'Verify that the application uses appropriate methods such as GET or POST, that safe character sets are used, same-origin policies are observed.',
      }),
      new UserStory({
        iWant:
          ', if an application component is vulnerable, I want the malicious activity against it to have minimal or no impact on the rest of the application.',
        description:
          'All malicious activity is adequately sandboxed, containerized or isolated to delay and deter attackers from attacking other applications.',
      }),
      new UserStory({
        iWant:
          'the application to be free of back doors, Easter eggs, and logic flaws, which could be abused by an attacker.',
        description:
          'Verify that application source code and 3rd party libraries do not contain back doors, Easter eggs, and logic flaws in authentication, access control, input validation, and the business logic of high value transactions.',
      }),
      new UserStory({
        iWant:
          'to use business logic with a sequentially ordered flow that includes limits to prevent automated attacks against financial modules and PII.',
        description:
          'Validate the application will only process business logic flows in sequential step order, with all steps being processed in realistic human time, and not process out of order, skipped steps, process steps from another user, or too quickly submitted transactions. Ensure the application has business limits and correctly enforces on a per user basis, with configurable alerting and automated reactions to automated or unusual attack.',
      }),
      new UserStory({
        iWant: 'the application to handle untrusted data securely.',
        description:
          'Untrusted file data should be handled in a secure manner, with data from untrusted sources stored outside the webroot and with limited permissions. Verify that files obtained from untrusted sources are validated to be of expected type. Untrusted file data submitted to the application is not used directly with file I/O commands, particularly to protect against path traversal, local file include, file mime type, and OS command injection vulnerabilities. Untrusted data is not used within inclusion, class loader, or reflection capabilities to prevent remote/local file inclusion vulnerabilities. Untrusted data is not used within cross- domain resource sharing (CORS) to protect against arbitrary remote content. The application code does not execute uploaded data obtained from untrusted sources.',
      }),
      new UserStory({
        iWant: 'the application to enforce the Same-Origin Policy for content.',
        description:
          'Verify that URL redirects and forwards only allow whitelisted destinations, or show a warning when redirecting to potentially untrusted content. the web or application server is configured by default to deny access to remote resources or systems outside the web or application server. Implement a Content Security Policy, where possible.',
      }),
      new UserStory({
        iWant:
          'my mobile client to enforce the same level of security controls as other Software company applications.',
        description:
          'Mobile clients must adhere to the Software company Secure Software Development Standard and are assessed with the same level of rigour as other Software company applications.',
      }),
      new UserStory({
        iWant: 'the mobile client to protect user data.',
        description:
          'The mobile app does not store sensitive data onto potentially unencrypted shared resources on the device (e.g. SD card or shared folders). Verify that sensitive data is not stored unprotected on the device, even in system protected areas such as key chains. The mobile app prevents leaking of sensitive information (for example, screenshots are saved of the current application as the application is backgrounded or writing sensitive information in console).',
      }),
      new UserStory({
        iWant: 'the mobile client to use secure authentication methods.',
        description:
          'ID values stored on the device and retrievable by other applications, such as the UDID or IMEI number are not used as authentication tokens. Verify that secret keys, API tokens, or passwords are dynamically generated in mobile applications.',
      }),
      new UserStory({
        iWant: 'the mobile client to observe the principle of "least privilege."',
        description: 'The application requests minimal permissions for required functionality and resources.',
      }),
      new UserStory({
        iWant: 'the mobile client to use secure coding techniques.',
        description:
          'The application sensitive code is laid out unpredictably in memory (For example ASLR) and that there are anti-debugging techniques present that are sufficient to deter or delay likely attackers from injecting debuggers into the mobile app (For example GDB). The app does not export sensitive activities, intents, or content providers for other mobile apps on the same device to exploit. Sensitive information maintained in memory is overwritten with zeros as soon as it no longer required, to mitigate memory dumping attacks. Verify that the app validates input to exported activities, intents, or content providers.',
      }),
      new UserStory({
        iWant: 'the web service to implement proper authentication, authorization and session management.',
        description:
          "Access to administration and management functions within the Web Service Application is limited to web service administrators. Verify the use of session-based authentication and authorization. Avoid the use of static 'API keys' and similar.",
      }),
      new UserStory({
        iWant: 'the web service to validate input.',
        description:
          'The same encoding style is used between the client and the server. Confirm that XML or JSON schema is in place and verified before accepting input. Ensure that all input is limited to an appropriate size limit. A REST service explicitly checks the incoming Content-Type to be the expected one, such as application/xml or application/json.',
      }),
      new UserStory({
        iWant: 'the web service to ensure confidentiality and integrity of the communication.',
        description:
          'Verify that SOAP based web services are compliant with Web Services-Interoperability (WS-I) Basic Profile at minimum. This essentially means TLS encryption. Message payloads are signed to ensure reliable transport between client and service, using JSON Web Signing or WS-Security for SOAP requests. Verify that alternative and less secure access paths do not exist.',
      }),
      new UserStory({
        iWant: 'I want a REST service protected from Cross-Site Request Forgery (CSRF) attacks.',
        description:
          'Use at one or more of the following: ORIGIN checks, double submit cookie pattern, CSRF nonces, and referrer checks.',
      }),
      new UserStory({
        iWant: 'all components of the application to have up-to-date libraries and platforms.',
        description:
          'All components should be up to date with proper security configuration(s) and version(s). Verify that third party components come from trusted repositories.',
      }),
      new UserStory({
        iWant: 'the application configuration to be "secure by default."',
        description:
          'Remove unneeded configurations and folders such as sample applications, platform documentation, and default or example users. Communications between components, such as between the application server and the database server, should be encrypted, particularly when the components are in different containers or on different systems. Communications between components, such as between the application server and the database server should be authenticated using an account with the least necessary privileges. Verify that all application components are signed and that build processes for system level languages have all security flags enabled, such as ASLR, DEP, and security checks.',
      }),
      new UserStory({
        iWant:
          'the application secured and hardened by default so that user changes do not expose security vulnerabilities or flaws with underlying systems.',
        description:
          'Validate that application deployments are adequately sandboxed, containerized or isolated to delay and deter attackers from attacking other applications. Verify that the application build and deployment processes are performed in a secure fashion. Confirm all application assets are hosted by the application rather than on a CDN or external provider, including; JavaScript libraries, CSS stylesheets and web fonts.',
      }),
    ];

    const defaultUserType = new UserType({ name: 'Software Development Company' });

    stories.forEach((story) => {
      story.setAsA(this.userType ?? defaultUserType);
      story.addLabel('owasp');
    });

    this._addStory(stories);
  };
}
