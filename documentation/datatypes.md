While simple page editing can be done in either the basic HTML or Markdown data types, some use cases call for structured data input (or data definitions) to create pages. Drafty supports any valid HTML form input as a data entry mechanism, along with some ways to wrap and notate content as it is rendered into HTML.

To create a new data type, add a new file containing partial HTML to the *js/data-types/partials* folder. You will then register this new partial in the *public/js/app-globals.js* file by adding an entry to either the  "DEFAULT_DATATYPES" global, or a "datatypes" array for each site definition:

      var DEFAULT_DATATYPES = [
        {id: 'html', name: 'HTML'},
        {id: 'markdown', name: 'Markdown'},
        {id: 'new-data-type', name: 'My New Data Type'},
       ];

Or

       var SITES = [
        {
             name: 'My Site',
             ...
             datatypes: [{id: 'my-data-type', name: 'My Data Type'}]
        }
       ];


The partials are true [Handlebars partials](http://handlebarsjs.com/partials.html), and make use of some helper functions to render the input.

### Creating a Partial
1. All form inputs require an "id" attribute that is unique for the page:`<input id="my-name-1" />
<input id="my-name-2" />`

2. Create a WYSIWYG textarea:`<textarea id="content" class="wysiwyg"></textarea>`

3. You can wrap the value of the input with HTML on output: `<input id="bold-message" data-wrapwith="<b></b>"/>`

4. You can add content before and after your input:`<input id="name" data-before="My name is " data-after=". What is yours?" />`

5. You'll want to include a call to a helper that brings back your form input, so it's visible the next time you edit the form:`<input id="my-name-1" value="{{{before_after_split "my-name-1"}}}" />`

6. But if you're doing a Markdown textarea, you just render the content:`<textarea id="my-content">{{content}}</textarea>`

7. Radio elements are special:
`<input {{{radio "my-id" "Option 1"}}}/> Option 1<br>
<input {{{radio "my-id" "Option 2"}}} Option 2/>`

8. So are selects:`<select id="sewer-status" data-value="{{{before_after_split "sewer-status"}}}" >...</select>`

9. And checkboxes
`<input type="checkbox" id="act-1" value="Bathing and showering" {{{checked_element "act-1"}}}/>`

10. You can do multiple text inputs
`<div class="multiples">
  {{{multiples_text "name-of-your-input"}}}
</div>`

11. And a file attachment
`<label for="upload-file-1" class="button-small pure-button upload-image" title="Attach a file">
    <i class="fa fa-cloud-upload"></i> Attach a File
</label>
<input id="upload-file-1" type="file" class="file-upload" />`

---
Remember to build/deploy Drafty after changes or additions to your data types.
