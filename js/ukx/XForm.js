define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang"], function(declare, baseArray, lang) {
	return declare("ukx.XForm", null, {
	  _questions : [],
    _submissions : [],

    getColumns : function() {
      return this._questions;
    },

    getData : function(){
      return this._submissions;
    },
    setForm : function(data) {
        if(lang.isObject(data)) {
          if(lang.isArray(data.children)){
            baseArray.forEach(data.children, dojo.hitch(this, function(col){
              field = {field: col.name, label: col.label}
              this._questions.push(field);
            }));
          }
        }
    },

    setSubmssions : function(data) {
      this._submissions = data;
    }
  })
});
