import{m as s,a as r,n as o}from"./app-f37d1114.js";import{_ as l,a as d}from"./Trades-d7e1f9d4.js";import{D as c,a as u}from"./data-grid-ec6370c3.js";import"./ui.data_grid.row_dragging-72b50656.js";import"./dialog-42ea61b6.js";const m={components:{DxDataGrid:c,DxColumn:u},data(){return{gridData:null,editPermission:"trades@edit",validationRules:{amount:[{type:"required",message:this.$t("trading.trades.amount")+this.$mt.validations.required}],scores:[{type:"required",message:this.$t("trading.trades.scores")+this.$mt.validations.required}],revenue:[{type:"required",message:this.$t("trading.trades.revenue")+this.$mt.validations.required}],loss:[{type:"required",message:this.$t("trading.trades.loss")+this.$mt.validations.required}],fees:[{type:"required",message:this.$t("trading.trades.fees")+this.$mt.validations.required}],date:[{type:"required",message:this.$t("trading.trades.date")+this.$mt.validations.required}]}}},computed:{...s("Auth",["permissions"]),...s("Trading.trades",["chart","trades"]),popup(){return this.$refs.popup.instance},dataGrid:function(){return this.$refs.dataGrid.instance}},watch:{trades(){this.gridData=this.$mf.cloneDeep(this.trades)}},methods:{...r("Trading.trades",["fetch","save"]),show(){this.popup.show(),this.fetch().then(()=>{this.gridData=this.$mf.cloneDeep(this.trades)}),this.$mf.pushPopupToHistoryState(()=>this.popup.hide())},onSave(a){setTimeout(()=>this.$bus.emit("checkPin",()=>this.save(a)),100)},onHiding(){this.gridData=null,this.$mf.popRouteHistoryState()}}};var p=function(){var e=this,t=e._self._c;return t("DxPopup",{ref:"popup",staticClass:"trade-popup",attrs:{showCloseButton:!0,fullScreen:!!e.$devices.phone,"show-title":!0,title:e.$t("trading.trades.buttons.addData")},on:{hiding:e.onHiding},scopedSlots:e._u([{key:"content",fn:function(){return[t("DxScrollView",[t("div",[t("DxDataGrid",{ref:"dataGrid",attrs:{"data-source":e.gridData,"key-expr":"id","show-borders":!0,"column-auto-width":!0,"allow-column-reordering":!0,"allow-column-resizing":!0,"column-resizing-mode":"widget",paging:{pageSize:8},headerFilter:{visible:!0},loadPanel:{enabled:!0},selection:{mode:"single"},editing:{allowAdding:e.permissions.includes(e.editPermission),allowUpdating:e.permissions.includes(e.editPermission),allowDeleting:e.permissions.includes(e.editPermission),mode:"batch",startEditAction:"dblClick"}},on:{contentReady:function(i){return e.$mf.dataGridPreload(e.gridData,e.dataGrid)},saved:e.onSave},scopedSlots:e._u([{key:"commandCellTemplate",fn:function({data:i}){return[t("DxToolbar",{attrs:{items:[{locateInMenu:"auto",showText:"inMenu",location:"center",widget:"dxButton",options:{type:"default",icon:"trash",hint:e.$t("buttons.delete"),text:e.$t("buttons.delete"),onClick:()=>{e.dataGrid.deleteRow(i.rowIndex)}}}]}})]}}])},[t("DxColumn",{attrs:{fixed:!0,visible:e.permissions.includes(e.editPermission),width:35,type:"buttons",cssClass:"dx-datagrid-command-column","cell-template":"commandCellTemplate",caption:e.$t("titles.commandHeaderTitleShort")}}),t("DxColumn",{attrs:{"data-field":"date","data-type":"date","editor-options":{dateSerializationFormat:e.$mc.DX_SERVER_DATE_FORMAT,showClearButton:"true",useMaskBehavior:"true",applyValueMode:"useButtons"},caption:e.$t("trading.trades.date"),"validation-rules":e.validationRules.date}}),t("DxColumn",{attrs:{"data-field":"amount","data-type":"number",width:100,caption:e.$t("trading.trades.amount"),"validation-rules":e.validationRules.amount}}),t("DxColumn",{attrs:{"data-field":"scores","data-type":"number",format:"#0.#","editor-options":{step:"0.1",format:"#0.#"},caption:e.$t("trading.trades.scores"),"validation-rules":e.validationRules.scores}}),t("DxColumn",{attrs:{"data-field":"revenue","data-type":"number",format:"#,##0","editor-options":{step:"1",format:"#,##0"},caption:e.$t("trading.trades.revenue"),"validation-rules":e.validationRules.revenue}}),t("DxColumn",{attrs:{"data-field":"loss","data-type":"number",format:"#,##0","editor-options":{step:"1",format:"#,##0"},caption:e.$t("trading.trades.loss"),"validation-rules":e.validationRules.loss}}),t("DxColumn",{attrs:{"data-field":"fees","data-type":"number",format:"#,##0","editor-options":{step:"1",format:"#,##0"},caption:e.$t("trading.trades.fees"),"validation-rules":e.validationRules.fees}})],1)],1)])]},proxy:!0}])})},h=[],f=o(m,p,h,!1,null,null,null,null);const v=f.exports;const g={components:{DxChart:l,TrackTradePopup:v},data(){return{principalTargetThreshold:{day:1,week:5,month:22,quarter:65,year:260},feesTargetThreshold:5,visibleSeries:{money:!0,profitPerPrincipal:!1,profitPerFees:!1,accumulatedProfit:!1}}},beforeCreate(){this.$store.registerModule("Trading.trades",d)},created(){this.getChart(this.$route.query.period??"day"),this.$bus.on("toggleMenu",()=>{setTimeout(()=>this.chart.render(),300)})},mounted(){this.$route.hash=="#data"&&this.$refs.trackTradePopup.show()},destroyed(){this.$store.unregisterModule("Trading.trades"),this.$bus.off("toggleMenu")},computed:{...s("Auth",["permissions"]),...s("Trading.trades",["charts","page","period"]),chart(){return this.$refs.chart.instance}},methods:{...r("Trading.trades",["getChart","lazyLoad","resetState"]),customizePoint({value:a,series:e}){return e.tag==="profitPerPrincipal"&&a>=this.principalTargetThreshold[this.charts.period]?{color:"Aqua",hoverStyle:{color:"Aqua"}}:e.tag==="profitPerFees"&&a>=this.feesTargetThreshold?{color:"Fuchsia",hoverStyle:{color:"Fuchsia"}}:{color:e.color,hoverStyle:{color:e.color}}},customizeText({valueText:a}){return`${a.replace(",0","").replace("M"," Tr")}`},customizeTooltip(a){let e=a.point.data.accumulatedProfit,t=this.getReferenceTime();if(t!==null){let i=this.charts.data.find(n=>n.time===t).accumulatedProfit;e=e-i}return{html:`<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${a.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.principalAvg")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(a.point.data.principal)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.revenueSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(a.point.data.revenue)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.lossSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(a.point.data.loss)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.feesSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(a.point.data.fees)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${a.point.data.profit>=0?"green":"red"}'>
                      ${this.$options.filters.currency(a.point.data.profit)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='top-series-name'>
                      ${this.$t("trading.trades.profitPerPrincipal")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='top-series-value'>
                      ${this.$options.filters.numberVnFormat(a.point.data.profitPerPrincipal,1)}%
                      (${(100*a.point.data.profitPerPrincipal/this.principalTargetThreshold[this.charts.period]).toFixed(0)}%
                      ${this.$t("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.profitPerFees")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.numberVnFormat(a.point.data.profitPerFees,1)}
                      (${(100*a.point.data.profitPerFees/this.feesTargetThreshold).toFixed(0)}%
                      ${this.$t("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.accumulatedProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(e)}
                    </span>
                  </div>
                </div>
              </div>`}},onPointClick({target:a}){let e=this.getReferenceTime()===a.argument?null:a.argument;this.setReferenceTime(e)},onLegendClick(a){const e=a.target;let t=this.getReferenceTime();e.isVisible()?(e.hide(),this.visibleSeries[e.tag]=!1):(e.show(),this.visibleSeries[e.tag]=!0),setTimeout(()=>this.setReferenceTime(t),0)},getReferenceTime(){return this.chart.option("argumentAxis.constantLines[0].value")},setReferenceTime(a){return this.chart.option("argumentAxis.constantLines[0].value",a)}}};var $=function(){var e=this,t=e._self._c;return t("div",{staticClass:"trades-page"},[t("h2",{staticClass:"content-block"},[e._v(" "+e._s(e.$t("trading.trades.title"))+" ")]),t("div",{staticClass:"content-block dx-card responsive-paddings"},[t("DxToolbar",{attrs:{items:[{visible:e.$mf.isSet(e.$route.query),location:"before",widget:"dxButton",options:{icon:"far fa-arrow-left small",hint:e.$t("buttons.back"),onClick:()=>e.$router.go(-1)}},{location:"before",cssClass:"page-button",widget:"dxButton",options:{icon:"far fa-backward small",hint:e.$t("trading.trades.buttons.more"),elementAttr:{"data-page":e.page},onClick:()=>e.lazyLoad()}},{location:"before",widget:"dxButton",options:{icon:"far fa-database small",hint:e.$t("trading.trades.buttons.addData"),onClick:()=>e.$refs.trackTradePopup.show()}},{location:"after",widget:"dxSelectBox",options:{width:80,items:e.$mf.getChartPeriodList(),displayExpr:"name",valueExpr:"value",value:e.charts.period,onValueChanged:i=>e.getChart(i.value)}}]}}),t("DxChart",{ref:"chart",attrs:{"data-source":e.charts.data,"customize-point":e.customizePoint,title:{text:e.$t("trading.trades.charTitle"),horizontalAlignment:"center"},size:{width:"100%"},zoomAndPan:{argumentAxis:"both"},loadingIndicator:{enabled:!0,show:!0,text:e.$t("titles.loadingText")},export:{enabled:!0,formats:["PNG"],fileName:"chart",printingEnabled:!1},commonSeriesSettings:{argumentField:"time",barPadding:0},series:[{name:e.$t("trading.trades.profitSum"),tag:"money",valueField:"s3",axis:"money",type:"stackedbar",stack:"money",color:"DarkGreen",visible:e.visibleSeries.money},{name:e.$t("trading.trades.lossSum"),valueField:"s4",axis:"money",type:"stackedbar",stack:"money",color:"FireBrick",showInLegend:!1,visible:e.visibleSeries.money},{name:e.$t("trading.trades.feesSum"),valueField:"s5",axis:"money",type:"stackedbar",stack:"money",color:"DarkOrange",showInLegend:!1,visible:e.visibleSeries.money},{name:e.$t("trading.trades.feesSum"),valueField:"s2",axis:"money",type:"stackedbar",stack:"money",color:"DarkOrange",showInLegend:!1,visible:e.visibleSeries.money},{name:e.$t("trading.trades.lossSum"),valueField:"s1",axis:"money",type:"stackedbar",stack:"money",color:"FireBrick",showInLegend:!1,visible:e.visibleSeries.money},{name:e.$t("trading.trades.profitPerPrincipal"),tag:"profitPerPrincipal",valueField:"profitPerPrincipal",axis:"profitPerPrincipal",type:"stackedbar",stack:"profitPerPrincipal",color:"Teal",visible:e.visibleSeries.profitPerPrincipal},{name:e.$t("trading.trades.profitPerFees"),tag:"profitPerFees",valueField:"profitPerFees",axis:"profitPerFees",type:"stackedbar",stack:"profitPerFees",color:"Purple",visible:e.visibleSeries.profitPerFees},{name:e.$t("trading.trades.accumulatedProfit"),tag:"accumulatedProfit",valueField:"accumulatedProfit",axis:"accumulatedProfit",type:"spline",color:"White",visible:e.visibleSeries.accumulatedProfit}],valueAxis:[{name:"money",synchronizedValue:0,label:{customizeText:e.customizeText}},{name:"profitPerPrincipal",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"profitPerFees",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"accumulatedProfit",label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1}],tooltip:{enabled:!0,shared:!1,customizeTooltip:e.customizeTooltip},legend:{verticalAlignment:"top",horizontalAlignment:"center",hoverMode:"none",markerTemplate:"markerTemplate"},argumentAxis:{constantLines:[{width:2,color:"white",dashStyle:"dot",value:null}]}},on:{pointClick:e.onPointClick,legendClick:e.onLegendClick},scopedSlots:e._u([{key:"markerTemplate",fn:function({data:i}){return[t("g",[i.series.tag==="accumulatedProfit"?t("g",[t("rect",{attrs:{x:-10,y:-1.5,width:30,height:2.5,fill:i.marker.fill}}),t("path",{attrs:{d:"M0,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",fill:i.marker.fill}})]):i.series.tag==="money"?t("g",[t("rect",{attrs:{x:0,y:0,width:10,height:10,fill:"DarkGreen"}}),t("rect",{attrs:{x:10,y:0,width:7,height:10,fill:"FireBrick"}}),t("rect",{attrs:{x:17,y:0,width:3,height:10,fill:"DarkOrange"}})]):t("g",[t("rect",{attrs:{x:0,y:0,width:20,height:10,fill:i.marker.fill}})])])]}}])})],1),t("TrackTradePopup",{ref:"trackTradePopup"})],1)},b=[],y=o(g,$,b,!1,null,null,null,null);const w=y.exports;export{w as default};
