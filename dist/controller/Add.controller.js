sap.ui.define(["com/emc/fin/ap/controller/BaseController","sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/m/MessageToast"],function(e,t,o,r){"use strict";return e.extend("com.emc.fin.ap.controller.Add",{onInit:function(){this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.getRoute("add").attachMatched(this.herculis,this);this.oLocalModel=new t;this.oLocalModel.setData({prodData:{PRODUCT_ID:"",TYPE_CODE:"",CATEGORY:"Notebooks",NAME:"",DESCRIPTION:"",SUPPLIER_ID:"0100000051",SUPPLIER_NAME:"TECUM",TAX_TARIF_CODE:"1",MEASURE_UNIT:"EA",PRICE:"0.00",CURRENCY_CODE:"EUR",DIM_UNIT:"CM",PRODUCT_PIC_URL:"/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-2022.jpg"}});this.getView().setModel(this.oLocalModel,"prod")},herculis:function(e){this.setMode("Create")},mode:"Create",setMode:function(e){this.mode=e;if(this.mode==="Create"){this.getView().byId("idSave").setText("Save");this.getView().byId("idDelete").setEnabled(false);this.getView().byId("prodId").setEnabled(true)}else{this.getView().byId("idSave").setText("Update");this.getView().byId("idDelete").setEnabled(true);this.getView().byId("prodId").setEnabled(false)}},productId:"",getImageForProduct:function(e,t){this.getView().byId("myImage").setSrc("/sap/opu/odata/sap/ZNOV_ODATA_SRV/ProductImgSet('"+e+"')/$value")},onEnter:function(e){this.productId=e.getParameter("value");var t=this.getView().getModel();var o=this;t.read("/ProductSet('"+this.productId+"')",{success:function(e){o.oLocalModel.setProperty("/prodData",e);o.setMode("Update")},error:function(e){r.show("Product not found, please create it");o.setMode("Create")}});this.getImageForProduct(this.productId,t)},onDelete:function(){if(this.productId===""){o.error("Please enter a valid product id for delete");return}var e=this.getView().getModel();var t=this;o.confirm("Do you wish to delete?",{onClose:function(r){if(r==="OK"){var s=t;e.remove("/ProductSet('"+t.productId+"')",{success:function(){o.confirm("Delete is now done");s.onClear()}})}}})},onExpensive:function(){var e=this.getView().byId("category").getSelectedKey();var t=this.getView().getModel();var o=this;t.callFunction("/GetMostExpensiveProduct",{urlParameters:{I_CATEGORY:e},success:function(e){o.oLocalModel.setProperty("/prodData",e);o.productId=e.PRODUCT_ID;o.setMode("Update")}})},onSave:function(){var e=this.oLocalModel.getProperty("/prodData");if(e.PRODUCT_ID===""){o.error("Please enter a valid new product Id");return}var t=this.getView().getModel();if(this.mode==="Create"){t.create("/ProductSet",e,{success:function(e){r.show("Congratulations! The data has been posted to SAP")},error:function(e){o.error(JSON.parse(e.responseText).error.innererror.errordetails[0].message)}})}else{t.update("/ProductSet('"+this.productId+"')",e,{success:function(e){r.show("Hey Amigo, The data has been updated")},error:function(e){o.error(JSON.parse(e.responseText).error.innererror.errordetails[0].message)}})}},onClear:function(){this.setMode("Create");this.oLocalModel.setProperty("/prodData",{PRODUCT_ID:"",TYPE_CODE:"",CATEGORY:"Notebooks",NAME:"",DESCRIPTION:"",SUPPLIER_ID:"0100000051",SUPPLIER_NAME:"TECUM",TAX_TARIF_CODE:"1",MEASURE_UNIT:"EA",PRICE:"0.00",CURRENCY_CODE:"EUR",DIM_UNIT:"CM",PRODUCT_PIC_URL:"/sap/public/bc/NWDEMO_MODEL/IMAGES/NV-2022.jpg"})}})});