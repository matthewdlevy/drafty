# Drafty - S3 static sites, with a WordPress feel

See [Drafty Documentation](http://www.draftycms.com/) for more information.

Drafty provides a lightweight mechanism for generating static sites on AWS S3. While numerous other systems (such as Jekyll or Octopress) provide efficient static site generation, they are geared toward developers and aren't suitable for use cases requiring non-technical users to create and edit site pages. Drafty fills a need where a static site is preferred, but the editing capabilities of something like WordPress are required.

Drafty is a fork of [DodgerCMS](http://dodgercms.com) that adds some significant features:

+ TinyMCE for WYSIWYG editing
+ Capability for multiple output page templates
+ Support of multiple data input forms ("data types")
+ Enhanced publishing, caching, and file upload features.
+ Integrated AWS Cognito user pools and authentication procedures
+ Support for multiple sites
+ Static menus

As Drafty is a Javascript application leveraging the AWS Javascript SDK, it may be run on any web server. No server-side code is required, with the exception of one small AWS Lambda function to handle access control.
