Drafty requires configuration of three S3 buckets to serve a site:
1. One for the public site
2. One for assets like images or PDFs
3. One for CMS-generated markdown

Each bucket requires slightly different permissions and CORS rules assigned to it.

In S3, create a bucket for each of the following, and then edit the appropriate settings in the "Properties > Permissions" tab.

In the examples below, you'll need to change the "your-site" values in the Bucket Policies to the names of your buckets.

##Public Site Bucket
+ Set this bucket to a "static website" and set the index page to "index"; 404 to "404" (or whatever you prefer).

###CORS Configuration

        <?xml version="1.0" encoding="UTF-8"?>
        <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <CORSRule>
                <AllowedOrigin>*</AllowedOrigin>
                <AllowedMethod>HEAD</AllowedMethod>
                <AllowedMethod>GET</AllowedMethod>
                <AllowedMethod>PUT</AllowedMethod>
                <AllowedMethod>POST</AllowedMethod>
                <AllowedMethod>DELETE</AllowedMethod>
                <ExposeHeader>ETag</ExposeHeader>
                <ExposeHeader>x-amz-meta-title</ExposeHeader>
                <ExposeHeader>x-amz-meta-label</ExposeHeader>
                <ExposeHeader>x-amz-meta-visibility</ExposeHeader>
                <ExposeHeader>x-amz-meta-template</ExposeHeader>
                <AllowedHeader>*</AllowedHeader>
            </CORSRule>
        </CORSConfiguration>

###Bucket Policy

        {
        	"Version": "2012-10-17",
        	"Id": "Policy1427772347182",
        	"Statement": [
        		{
        			"Sid": "Stmt1427772340560",
        			"Effect": "Allow",
        			"Principal": "*",
        			"Action": "s3:GetObject",
        			"Resource": "arn:aws:s3:::your-site-site/*"
        		}
        	]
        }


##Asset Bucket

###CORS Configuration

        <?xml version="1.0" encoding="UTF-8"?>
        <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <CORSRule>
                <AllowedOrigin>*</AllowedOrigin>
                <AllowedMethod>HEAD</AllowedMethod>
                <AllowedMethod>GET</AllowedMethod>
                <AllowedMethod>PUT</AllowedMethod>
                <AllowedMethod>POST</AllowedMethod>
                <AllowedMethod>DELETE</AllowedMethod>
                <AllowedHeader>*</AllowedHeader>
            </CORSRule>
        </CORSConfiguration>



###Bucket Policy

        {
        	"Version": "2012-10-17",
        	"Statement": [
        		{
        			"Sid": "AddPerm",
        			"Effect": "Allow",
        			"Principal": "*",
        			"Action": "s3:GetObject",
        			"Resource": "arn:aws:s3:::your-site-assets/*"
        		}
        	]
        }

##Markdown Bucket

###CORS Configuration


        <?xml version="1.0" encoding="UTF-8"?>
        <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <CORSRule>
                <AllowedOrigin>*</AllowedOrigin>
                <AllowedMethod>HEAD</AllowedMethod>
                <AllowedMethod>GET</AllowedMethod>
                <AllowedMethod>PUT</AllowedMethod>
                <AllowedMethod>POST</AllowedMethod>
                <AllowedMethod>DELETE</AllowedMethod>
                <ExposeHeader>ETag</ExposeHeader>
                <ExposeHeader>x-amz-meta-datatype</ExposeHeader>
                <ExposeHeader>x-amz-meta-title</ExposeHeader>
                <ExposeHeader>x-amz-meta-label</ExposeHeader>
                <ExposeHeader>x-amz-meta-visibility</ExposeHeader>
                <ExposeHeader>x-amz-meta-template</ExposeHeader>
                <AllowedHeader>*</AllowedHeader>
            </CORSRule>
        </CORSConfiguration>

---

##Running Drafty on an S3 static site
You can run Drafty on any webserver - your localhost, any LAMP or IIS server, even on an S3 static site of its own. If you choose to do that, you'll need to set the CORS Configuration for the Drafty site bucket to

        <CORSConfiguration>
            <CORSRule>
                <AllowedOrigin>*</AllowedOrigin>
                <AllowedMethod>GET</AllowedMethod>
                <MaxAgeSeconds>3000</MaxAgeSeconds>
                <AllowedHeader>Authorization</AllowedHeader>
            </CORSRule>
        </CORSConfiguration>
