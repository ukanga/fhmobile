define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/aspect", "dojox/mobile/View", "ukx/_ViewMixin", "dojo/DeferredList", "dojo/io/script", "dijit/registry", "ukx/XForm", "dgrid/Grid"], function(declare, baseArray, lang, aspect, mView, _ViewMixin, DeferredList, ioScript, registry, ukXform, Grid) {
  declare("ukx.DataView", [mView, _ViewMixin], {

    iconLoading: require.toUrl("ukx/resources/images/loading.gif"),
    serviceUrl: "http://formhub.org/ukanga/forms/work_expense_capture/api",
    xform : new ukXform(),
    

    startup : function() {
      this.inherited(arguments);
      console.log(this.xform);
      this.refreshButton = registry.byId(this.getElements("dataviewRefresh", this.domNode)[0].id);
			this.iconNode = this.refreshButton.iconNode.childNodes[0];
			this.iconImage = this.iconNode.src;
			
			aspect.after(this.refreshButton, "onClick", lang.hitch(this, 'refresh'), true);
			this.refresh();
    },
    
    refresh : function() {
      // Set the refresh icon
			var refreshButton = this.refreshButton;
			refreshButton.set("icon", this.iconLoading);
			refreshButton.select(); 
      this.getXform().then(lang.hitch(this, this.onFormReceived));
      this.getSubmissions().then(lang.hitch(this, this.onSubmissionsReceived));
    },

    getXform : function(){
      return ioScript.get({
			  callbackParamName: "callback",
			  preventCache: true,
				timeout: 3000,
			  url: "http://formhub.org/ukanga/forms/work_expense_capture/form.json"
			});
    },

    getSubmissions : function(){
      return ioScript.get({
			  callbackParamName: "callback",
			  preventCache: true,
				timeout: 3000,
			  url: "http://formhub.org/ukanga/forms/work_expense_capture/api"
			});
    },

    onFormReceived: function(rawData){
      this.xform.setForm(rawData);
      console.log(rawData);
    },

    onSubmissionsReceived: function(rawData){
      // Set the refresh icon back
			var refreshButton = this.refreshButton;
			this.iconNode.src = this.iconImage;
			refreshButton.select(true);
			this.xform.setSubmissions(rawData);
      console.log(rawData);
      this.displayGrid();
    },

    displayGrid : function() {
      if(this.xform.isReady()){
        var columns = this.xform.getColumns();
        var data = this.xform.getData();
        console.log(columns);
        console.log(data);
        var grid = new Grid({ columns: columns }, "grid");
        grid.renderArray(data);
      }
    }
  })
});
