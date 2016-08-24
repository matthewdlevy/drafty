# Drafty - a fork of DodgerCMS supporting WYSIWYG and Data Types
See [Drafty Documentation](http://www.draftycms.com/) for more information.

## Modifications
================

### Allow HTML in markdown
- Change app.js (line 29) and entry.js (line 86) marked options "sanitize" to true.
- Added TinyMCE (index.html) and fire on page edit (app.js - line 783); added tinymce and console to globals in .jshintrc;
- Added methods to add/remove TinyMCE as destruction of editor is required on page update (app.js).

### Update all files
- Added "quickPublishEntry" in app.js (line 793) to get and save all files so a template update can propagate across all pages.

### Changed AWS/S3 library for deployment
- Switched to grunt-aws-s3 from grunt-s3 for support of latest Grunt/AWS versions.

### Added local file caching to improve performance and reduce S3 requests

### Added a template system to handle multiple document form types
- Added a metadata value of "datatype" to the S3 docs
- Requires adding <ExposeHeader>x-amz-meta-datatype</ExposeHeader> to the markdown S3 bucket CORS policy
- Form elements are added as Handlebars Partials (see bottom of app.js) and can be selected using a dropdown (#data-type-selector) in index.html
- Partials are bound via Backbone to a data model; this renders different form element inputs in output HTML
- To create a new data type, add a Backbone model of the Partial in the /public/js/data-types/partials.js file
- The partials will output as a linear block of HTML on the output page.
- Other form elements (metadata) can be added to index.html

### Added method to add metadata fields easily to assets
- Add "metadata" class to form field in index.html

### Added method to unpublish pages without removing the markdown files
- Set the metadata visibility to 'not-visible'
- Requires adding <ExposeHeader>x-amz-meta-visibility</ExposeHeader> to the markdown S3 bucket CORS policy

### Added method to publish the menu file

### Added advanced partial/template formatting
- Moved partials into standalone html files (/public/js/data-types/partials)
- Partials must still be declared and registered in the Backbone collection in /public/js/data-types/partials.js
- Added "wrapwith" data attribute to partials; pass a closed HTML element and the content of the element will be wrapped on output
- Data elements may be "multiple" (editor can add 1+n of an element). In the Partial HTML, add a call to the multiples helper and pass an id to use on the elements: {{{multiples_text "roads"}}}

### Updated method for file attachments; supports multiple attachments and deletes

### Added support for radio elements in data type templates

### Changed main menu approach to build at publish within the page files

### Added support for multiple template types
- Just add the template file in the templates directory and add the path in the Gruntfile.js under handlebars.files: "public/js/dist/entry.min.js": ["templates/entry.html", "templates/home.html"]
- Requires adding <ExposeHeader>x-amz-meta-template</ExposeHeader> to the markdown S3 bucket CORS policy

## Using Cognito for Identity Management and Authentication
- Create a AWS Cognito User Pool (with App) and Identity Pool
- User Pool requires name, email (alias); the app must NOT have a secret key

## Using Lambda to limit access to the Identity Pool
- Account sign-ups can (and should) be limited to a select set of users, as users have complete edit rights on the S3 buckets.
- Create a small Lambda function containing an array of email addresses permitted to access this Drafty instance (example provided at "lambda-pre-authorization-example.js");
- Verification codes will be sent to the email addresses at registration.
- Attach the Lambda function to the Cognito Identity Pool's Pre-Authorization call.

Notes
----
- Compile all changes by running grunt locally and upload the minified "publish/js/dist" files to S3 (or run locally with a Bitnami/dev server).
- On S3, only index.html, login.html and "public" folder are required; see deploy method in Gruntfile.js
- Deploy CMS with $ grunt deploy
- Buckets and Cognito keys are defined in app-globals.js
