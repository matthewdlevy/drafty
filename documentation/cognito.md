You can use AWS Cognito to handle user access to the site(s). This will allow for a username and password workflow that grants editing access to the destination site.

In Cognito, there are two concepts - one is the creation of a "user pool" which is the workflow mechanism for handling usernames, passwords, and other user-generated data. This user pool can then be attached to a "federated identity pool". Within a federated identity pool, multiple user pools, or credentialing services code be used, such as Twitter, Facebook, Google. For the purposes of Drafty, we will need one user pool and one federated identity.

##Create a User Pool
When creating a user pool, be sure to require a name and email (set as an alias). *Add the User Pool Pool Id in the /public/js/app-globals.js file.*

###Add an app
Add an app to your user pool; *Add the App Client ID into Drafty's /public/js/app-globals.js file.*

*Your app must not have an app secret key.*

##Create a Federated Identity Pool
Make note of the "Identiy Pool ID"; *Enter this in the /public/js/app-globals.js file.*

You'll be prompted to create two IAM roles when you create the federated identity pool. You can let AWS automatically create these roles.

###Authentication Providers
Enter the User Pool ID and the App Client ID from the Cognito user pool in the Cognito tab of the Authentication providers dropdown.

---

##Update the Authenticated IAM Role policy
In IAM, attach the policy you created for your site user (see [Configuring IAM](setup/configuring-iam.md)) to the authenticated Cognito role.

Alternatively, if you edit the authenticated user role policy inline, it should read:

        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "Stmt1427944232000",
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket",
                        "s3:GetObject",
                        "s3:DeleteObject",
                        "s3:PutObject",
                        "s3:GetBucketWebsite",
                        "s3:PutBucketWebsite",
                        "s3:DeleteBucketWebsite",
                        "s3:GetBucketLogging",
                        "s3:GetBucketVersioning",
                        "s3:GetBucketLocation"
                    ],
                    "Resource": [
                        "arn:aws:s3:::your-site-assets",
                        "arn:aws:s3:::your-site-assets/*",
                        "arn:aws:s3:::your-site-markdown",
                        "arn:aws:s3:::your-site-markdown/*",
                        "arn:aws:s3:::your-site",
                        "arn:aws:s3:::your-site/*"
                    ]
                },
                {
                    "Effect": "Allow",
                    "Action": "sts:GetFederationToken",
                    "Resource": "*"
                }
            ]
        }

---
##Lambda Pre Sign-Up Trigger
To restrict who can create an account on your Drafty instance, you can create a Lambda function that contains an array of email addresses to be checked when a user attempts to create an account. In Lambda, create a new NodeJS script using any of the NodeJS templates. Replace the code of the script with:

        'use strict';
        console.log('Loading function');

        exports.handler = (event, context) => {
            var permitted = [
                'user1@test.com',
                'user2@test.com',
                'user3@test.com',
                'user4@test.com'
            ];
            var isPermitted = false;
            console.log('Received event:', JSON.stringify(event, null, 2));
            for(var p in permitted){
                if(event.request.userAttributes.email == permitted[p]){
                    isPermitted = true;
                    break;
                }
            }

            if(!isPermitted){
                throw(new Error('not permitted'));
            }
            context.done(null, event);
        };

Back in Cognito, go to your User Pool and under "Triggers" add your Lambda function in the Pre Sign-Up input.        
