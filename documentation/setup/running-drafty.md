You can get the latest Drafty build at [https://bitbucket.org/matthewdlevy/drafty](https://bitbucket.org/matthewdlevy/drafty)

You can run Drafty out of the box by just fetching the project and putting these files in any accessible web server:
+ index.html
+ login.html
+ public/*

#### While Drafty can be run locally, it needs to run in the context of a web server, not just local files.
---

## Update Global Variables
At a minimum, you will need to configure the bucket names and Cognito keys in the */public/js/app-globals.js* file.

### Multiple Sites
Drafty supports publishing and management of multiple destination sites. To add additional sites, you will follow the process of configuring S3 and IAM for each site. Then in the globals file (*/public/js/app-globals.js*) add a JSON item defining the buckets, templates, and data types available to each site:

          var SITES = [
                {
                    name: 'Site Number One',
                    markdown_bucket: 'site-one-markdown',
                    assets_bucket: 'site-one-assets',
                    site_bucket: 'site-one-site',
                    aws_region: 'us-east-1',
                    datatypes: [ //site specific datatypes
                        {id: 'operations', name: 'Operations'},
                        {id: 'development', name: 'Development'}
                    ],
                    templates: [ //site specific templates
                        {id: 'templates/site-one/entry.html', name: 'Site One: Entry'},
                        {id: 'templates/site-one/home.html', name: 'Site One: Home'}
                    ]
                },
                ... (repeat for subsequent sites)
            ];

---

## Modifying Templates (and other edits)
Drafty is built as a Node.js/Grunt application. You will need to install [NodeJS](https://nodejs.org/en/download/) and [Grunt](http://gruntjs.com/installing-grunt)

From your Drafty directory get all of the dependencies by running
`$ npm install `

You will need to rename or copy the "grunt-aws-sample.json" file to "grunt-aws.json" (more on that under deployment).

Build Drafty by running
`$ grunt `

Anytime you add or modify a template or data type, you will need to build Drafty (and refresh your browser if you happen to have Drafty open).

### Deploying Drafty to S3
You can run Drafty on any old web server, but why not run it on S3 too? To make deployment simple, you need to add some keys to the "grunt-aws.json" file.

This file should get the keys of an IAM user that has access to your static site deployment of Drafty (not your content output site). This should not be the same as the IAM user you created to manage content. You only need to fill this in if you want to deploy changes to Drafty to your cloud instance.

When you create the new IAM user, you will download the access keys for that user. You will enter those keys in your "grunt-aws.json" file.

Back in AWS, this new IAM user should get an inline security policy that allows access to the Drafty bucket, something like

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "Stmt1447441609000",
                    "Effect": "Allow",
                    "Action": [
                        "s3:GetObject",
                        "s3:GetObjectAcl",
                        "s3:ListBucket",
                        "s3:PutObject",
                        "s3:PutObjectAcl"
                    ],
                    "Resource": [
                        "arn:aws:s3:::name-of-your-drafty-cloud-bucket/*"
                    ]
                }
            ]
        }

Deploy Drafty to your cloud instance on S3 by running
`$ grunt deploy `

Now when you update templates or data types, you can deploy your changes quickly to your cloud instance of Drafty.
