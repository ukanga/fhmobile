define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/aspect", "dojox/mobile/View", "ukx/_ViewMixin", "dojo/DeferredList", "dojo/io/script", "dijit/registry", "ukx/XForm"], function(declare, baseArray, lang, aspect, mView, _ViewMixin, DeferredList, ioScript, registry, ukXform) {
  declare("ukx.DataView", [mView, _ViewMixin], {

    iconLoading: require.toUrl("ukx/resources/images/loading.gif"),
    serviceUrl: "http://localhost:8000/ukanga",
    xform : new ukXform(),
    

    startup : function() {
      this.inherited(arguments);
      console.log(this.xform);
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
      this.xform.setForm(rawData[0]);
      console.log(this.xform.getColumns())
      console.log(rawData);
    },
  })
});
