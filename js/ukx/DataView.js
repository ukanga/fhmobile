define(["dojo/_base/declare", "dojo/_base/lang", "dojo/aspect", "dojox/mobile/View", "ukx/_ViewMixin", "dojo/DeferredList", "dojo/io/script", "dijit/registry"], function(declare, lang, aspect, mView, _ViewMixin, DeferredList, ioScript, registry) {
  declare("ukx.DataView", [mView, _ViewMixin], {

    iconLoading: require.toUrl("ukx/resources/images/loading.gif"),
    serviceUrl: "http://localhost:8000/ukanga",

    xform : {
      questions : {},
      getColumns : function(){
        return questions;
      },
      submissions : {},
      getData : function{
        return submissions;
      } 
      
    },

    startup : function() {
      this.inherited(arguments);
      
      this.refreshButton = registry.byId(this.getElements("dataviewRefresh", this.domNode)[0].id);
			this.iconNode = this.refreshButton.iconNode.childNodes[0];
			this.iconImage = this.iconNode.src;
			
			aspect.after(this.refreshButton, "onClick", lang.hitch(this, 'refresh'), true);
    },
    
    refresh : function() {
      // Set the refresh icon
			var refreshButton = this.refreshButton;
			refreshButton.set("icon", this.iconLoading);
			refreshButton.select();
			var defs = [];
			defs.push(ioScript.get({
			  callbackParamName: "callback",
			  preventCache: true,
				timeout: 3000,
			  url: "http://localhost:8000/ukanga/forms/1work_expense_capture/form.json"
			}));
      console.log("Hello");
      new DeferredList(defs).then(lang.hitch(this, this.onFormReceived),
        function(err){
          console.log("Error: " + err);
        }
      );
    },
    
    onFormReceived: function(rawData){
      // Set the refresh icon back
			var refreshButton = this.refreshButton;
			this.iconNode.src = this.iconImage;
			refreshButton.select(true);
      
      console.log(rawData);
    }
  })
});
