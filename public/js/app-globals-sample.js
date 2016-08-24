//Define your S3 site buckets and regions, as well as site-specific datatypes
var SITES = [
        {
            name: 'Site Number One',
            markdown_bucket: 'site-one-markdown',
            assets_bucket: 'site-one-assets',
            site_bucket: 'site-one-site',
            aws_region: 'us-east-1',
            datatypes: [],
            templates: [],
            menu_template: null
        }
    ];

//Global data types
var DEFAULT_DATATYPES = [
        {id: 'html', name: 'HTML'},
        {id: 'markdown', name: 'Markdown'},
        {id: 'multiples', name: 'Multiples'}
    ];
var DATATYPES = DEFAULT_DATATYPES;

//Global templates
var DEFAULT_TEMPLATES = [ {id: 'templates/entry.html', name: 'Generic Page'} ];
var TEMPLATES = DEFAULT_TEMPLATES;

var PARTIALS_PATH = 'public/js/data-types/partials/';
var DATA_KEY = '.dodgercms/data.json'; //contains folder structure reference
var MENU_TEMPLATE = 'templates/menu.html'; //the menu template

var DATA_BUCKET;
var ASSETS_BUCKET;
var SITE_BUCKET;
var AWS_REGION = 'us-east-1';

//if only one site defined, set the globals automatically
if (SITES.length === 1) {
    DATA_BUCKET = SITES[0].markdown_bucket;
    ASSETS_BUCKET = SITES[0].assets_bucket;
    SITE_BUCKET = SITES[0].site_bucket;
    AWS_REGION = SITES[0].aws_region;
    if (SITES[0].datatypes) {
        _.each(SITES[0].datatypes, function(dt){
          DATATYPES.push(dt);
        });
    }
}

var SITE_ENDPOINT = 'http://' + SITE_BUCKET + '.s3-website-' + AWS_REGION + '.amazonaws.com/';
var CONTENT_TYPE = 'text/plain; charset=UTF-8';
var S3_ENDPOINT = 's3.amazonaws.com';

//Cognito
var POOL_ID = '';
var CLIENT_ID = '';
var ID_POOL_ID = '';
