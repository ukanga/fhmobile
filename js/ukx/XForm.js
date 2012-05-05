define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang"], function(declare, baseArray, lang) {
	return declare("ukx.XForm", null, {
	  constructor : function(args) {
	    declare.safeMixin(this, args);
	    this._questions = [];
	    console.log("Cannot believe this yet", this._questions);
	  },
    getColumns : function() {
      return this._questions;
    },
    _submissions : [],
    getData : function(){
      return this._submissions;
    },
    setForm : function(rawData) {
      if(!lang.isArray(rawData))
        return;
      baseArray.forEach(rawData, dojo.hitch(this, function(data){
        if(lang.isObject(data)) {
          if(lang.isArray(data.children)){
            baseArray.forEach(data.children, dojo.hitch(this, function(col){
              field = {field: col.name, label: col.label}
              this._questions.push(field);
            }));
          }
        }
      }));
    }
  })
});
