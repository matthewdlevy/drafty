Drafty is a fork of [DodgerCMS](http://dodgercms.com) that adds some important features:

+ TinyMCE for WYSIWYG editing
+ Capability for multiple output page templates
+ Support of multiple data input forms ("data types")
+ Enhanced publishing, caching, and file upload features.
+ Integrated AWS Cognito user pools and authentication procedures
+ Support for multiple sites

At its core, Drafty (by way of DodgerCMS) provides a lightweight mechanism for generating static sites on AWS S3. While numerous other systems (such as Jekyll or Octopress) provide efficient static site generation, they are geared toward developers and aren't suitable for use cases requiring non-technical users to create and edit site pages. Drafty fills a need where a static site is preferred, but the editing capabilities of something like WordPress are required.

As Drafty is a Javascript application, it may be run on any web server. No server-side code is required.

---
## Basic Architecture
Drafty requires three S3 buckets to store file attachments, markdown, and html for the final static site. You can run Drafty on any webserver, including a fourth S3 bucket operating as a static site.
[Diagram](https://s3.amazonaws.com/drafty-doc-assets/images/1450447110176_drafty-diagram.png)

Drafty can support management of multiple sites.

## Permissions
Drafty uses IAM credentials and policies to control access to the buckets. You will need at least one IAM user (and their keys) with access to the three buckets. You can optionally create a second IAM user with access to your fourth bucket if you want to run Drafty on an S3 static site.

---
### Download Drafty
Drafty is currently available at its [own repository](https://github.com/matthewdlevy/drafty).

---
#### Contact
For Drafty questions or collaboration:
+ [matthewdlevy@gmail.com](mailto:matthewdlevy@gmail.com)
+ [Matthew Levy on LinkedIn](https://www.linkedin.com/in/matthewdlevy)
