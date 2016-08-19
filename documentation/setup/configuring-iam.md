To access the S3 buckets from the Drafty CMS, you will need to create a user in AWS Identity and Access Management (IAM). Your user will need an inline security policy with access to your buckets:

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
                        "arn:aws:s3:::your-asset-bucket",
                        "arn:aws:s3:::your-asset-bucket/*",
                        "arn:aws:s3:::your-markdown-bucket",
                        "arn:aws:s3:::your-markdown-bucket/*",
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
### Multiple Sites
If you have multiple sites managed by this Drafty instance, be sure to add all of the necessary bucket references to this policy.

----
### Access Keys
Be sure to download and save the access keys for this user (available when you create the user) as you will need these to login to Drafty and edit your site content.
