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
