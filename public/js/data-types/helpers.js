/*
 * Data Types Helpers
 */

Handlebars.registerHelper('before_after_split', function(id, wysiwyg){
  var $context = $.parseHTML(this.content);
  var el = _.findWhere($context, {id: id});
  $(el).find('.before, .after').remove();
  if(wysiwyg !== 'wysiwyg'){
    return $(el).text();
  }
  else {
    return $(el).html();
  }
});

Handlebars.registerHelper('radio', function(id, value){
  var $context = $.parseHTML(this.content);
  var el = _.findWhere($context, {id: id});

  var html = 'id="'+id+'" name="'+id+'" value="'+value+'" type="radio"';
  if($(el).text() == value) {
    html += ' checked';
  }

  return html;
});

Handlebars.registerHelper('checked_element', function(id){
  var $context = $.parseHTML(this.content);
  var el = _.findWhere($context, {id: id});
  if(el) {
    return ' checked';
  }
});

Handlebars.registerHelper('multiples_text', function(id){
  var $context = $.parseHTML(this.content);
  var els = _.filter($context, function(element){
    //find all elements with the id and an iterator
    return element.id.indexOf(id) === 0;
  });

  var html = '';
  if(els.length == 0){
    html = '<div><input type="text" value="" id="'+id+'_0"/></div>';
  }
  else {
    $(els).each(function(){
      $(this).find('.before, .after').remove();
      html += '<div><input type="text" value="'+$(this).text()+'" id="'+$(this).attr('id')+'"/>';
      if($(this).attr('id') != id+'_0'){
        //add a delete button
        html += '<button class="button-xsmall pure-button remove-multiple"><i class="fa fa-times"></i></button>';
      }
      html += '</div>';
    }); ;
  }

  html += '<button class="button-small pure-button add-multiple" data-target="'+id+'"><i class="fa fa-plus"></i> Add another</button>';

  return html;
});
