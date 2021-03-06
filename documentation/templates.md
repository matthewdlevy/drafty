One of the major differences between Drafty and DodgerCMS is Drafty's support of multiple output page templates. To create page templates you will need to be able to modify Drafty and compile it.

### Template HTML
To add a new template file, create a new HTML file in the /templates folder, following the naming convention "file.html". Drafty uses [Handlebars](http://handlebarsjs.com) to build the page templates.

---

### Register the Template
In */public/js/app-globals.js*, you'll need to add any new templates to the global variables so they are available. Just add the path and name of your new template to the either the DEFAULT_TEMPLATES or a "templates" node of a site within the SITES global.

        var DEFAULT_TEMPLATES = [
              {id: 'templates/entry.html', name: 'Generic Page'},
              {id: 'templates/new.html', name: 'New Page Template'}
            ];

Or, within a site object:

        templates: [
            {id: 'templates/entry.html', name: 'Generic Page'},
            {id: 'templates/new.html', name: 'New Page Template'}
          ]

When you create a new file in Drafty, this template will now be a choosable option.

### Deploying Template Changes
When you change or add a template, you will need to build Drafty:

`$ grunt`

If you're running Drafty in S3 as well, deploy the change to your cloud instance of Drafty:

`$ grunt deploy`

To see your new template in the chooser, refresh Drafty in your browser. To propagate a template change to pages that have already been created and published, click on the "Publish All Files" link in Drafty's main menu, after you've refreshed the browser (remember Drafty runs completely in Javascript within your browser, so any changes to the build will require a page refresh to load the newly compiled Javascript).

### Templates with External Files
Templates can make use of files beyond the basic HTML of the Handlebars templates. To add files like CSS, Javascript, images, etc to your site, simply add files to the /templates folder, using any folder structure appropriate for your project. If you want to leverage Sass and subfolders, you'll need to update the Gruntfile.js with a build definition in the sass task:

                {
                  expand: true,
                  cwd: 'templates/subfolder/css/sass',
                  src: ['**/*.{scss,sass}'],
                  dest: 'templates/subfolder/css',
                  ext: '.css'
                }


All of the files in the templates folder can be pushed to your site by running

`$ grunt deploy-templates --site your-site-bucket`

Replace "your-site-bucket" with the name of your site's bucket. The files will then be available at http://your-site/.templates/...

*Notice the dot (.) in front of "templates" in the URL path (this keeps the files out of Drafty's index of site folders).*

---
## Menus
Drafty generates site menus based on a specific menu Handlebars template. This template is located at *templates/menu.html* by default, and can be changed based on your specific needs updating the MENU_TEMPLATE global in the *public/js/app-globals.js* file. Currently only one menu template is supported per Drafty site. To change the menu template for a given site, add a "menu_template" parameter to the site object in *public/js/app-globals.js*, equal to the path of your menu template:

            {
              name: 'Site Number One',
              markdown_bucket: 'site-one-markdown',
              assets_bucket: 'site-one-assets',
              site_bucket: 'site-one-site',
              aws_region: 'us-east-1',
              datatypes: [],
              templates: [],
              menu_template: 'templates/your-sub-ui/menu.html'
        }

By default, a site structure file is generated whenever a page is added, moved, or deleted. When pages are published, they reference this file (located at http://your-site/.dodgercms/data.json) and build the menu. Because the menus are updated only when a page is published, it is recommended that you "Publish All Files" following a page deletion, creation, or move.
