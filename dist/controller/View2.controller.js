sap.ui.define(["com/emc/fin/ap/controller/BaseController","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,o,n,r){"use strict";return e.extend("com.emc.fin.ap.controller.View2",{onInit:function(){this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.getRoute("superman").attachMatched(this.herculis,this)},herculis:function(e){debugger;var t=e.getParameter("arguments").fruitId;var i="/"+t;this.getView().bindElement(i,{expand:"To_Supplier"})},onBack:function(){this.getView().getParent().to("idView1")},onSave:function(){var e=this.getView().getModel("i18n");var o=e.getResourceBundle();var n=o.getText("msgSuccess",["858585"]);var r=o.getText("msgError");t.confirm("Do you want to save?",{title:"Confirmation",onClose:function(e){if(e==="OK"){i.show(n)}else{t.error(r)}}})},oPopupSupplier:null,oCityPopup:null,oField:null,onFilter:function(){var e=this;if(!this.oPopupSupplier){o.load({name:"com.emc.fin.ap.fragments.popup",id:"supplier",controller:this}).then(function(t){e.oPopupSupplier=t;e.oPopupSupplier.setTitle("Supplier");e.getView().addDependent(e.oPopupSupplier);e.oPopupSupplier.bindAggregation("items",{path:"/suppliers",template:new sap.m.ObjectListItem({title:"{name}",intro:"{sinceWhen}",number:"{contactNo}"})});e.oPopupSupplier.open()})}else{this.oPopupSupplier.open()}},onF4Help:function(e){this.oField=e.getSource();var t=this;if(!this.oCityPopup){o.load({name:"com.emc.fin.ap.fragments.popup",id:"city",controller:this}).then(function(e){t.oCityPopup=e;t.oCityPopup.setTitle("Supplier");t.getView().addDependent(t.oCityPopup);t.oCityPopup.setMultiSelect(false);t.oCityPopup.bindAggregation("items",{path:"/cities",template:new sap.m.ObjectListItem({title:"{name}",intro:"{famousFor}",number:"{otherName}"})});t.oCityPopup.open()})}else{this.oCityPopup.open()}},onSearchDialog:function(e){var t=e.getParameter("value");var i=new n("name",r.Contains,t);var o=e.getSource();o.getBinding("items").filter(i)},onConfirmPopup:function(e){var t=e.getSource().getId();if(t.indexOf("city")!=-1){var i=e.getParameter("selectedItem");var o=i.getTitle();this.oField.setValue(o)}else{var p=[];var a=e.getParameter("selectedItems");for(let e=0;e<a.length;e++){const t=a[e];var s=t.getTitle();var u=new n("name",r.EQ,s);p.push(u)}var l=new n({filters:p,and:false});this.getView().byId("idTable").getBinding("items").filter(l)}},onCancel:function(){},onItemPressSupp:function(e){var t=e.getParameter("listItem").getBindingContextPath();var i=t.split("/")[t.split("/").length-1];this.oRouter.navTo("ironman",{suppId:i})}})});