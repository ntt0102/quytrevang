import{_ as S}from"./chart-dadfcc40.js";import C from"./OpeningSummary-b92ae015.js";import A from"./Summary-f1d17162.js";import z from"./TrackStatisticPopup-9aab66a0.js";import{u as F,b as B,c as D,i as b,d as L,r as V,e as R,y as E,f as q,g as d,j as o,h as g,k as M,l as N,F as j,o as u}from"./app-36dfebf5.js";import"./m_base_chart-5ca41f10.js";const G={class:"trades-page content-block dx-card responsive-paddings"},W={key:0},O=["fill"],U={key:1},Z=["fill"],ee={__name:"Index",setup(H){const f=F(),k=B(),{t:n}=D(),v=b("bus"),r=b("filters");let p={targetThreshold:{profit:0,rr:1,winrate:50}};const i=L({profit:!0,rr:!1,winrate:!1,accProfit:!0}),l=V(null),c=R(()=>f.state.tradingStatistic.charts);f.dispatch("tradingStatistic/getProfitChart",k.query.period??"day"),v.on("toggleMenu",()=>{setTimeout(()=>l.value.instance.render(),300)}),E(()=>v.off("toggleMenu"));function w(e){f.dispatch("tradingStatistic/getProfitChart",e)}function $({value:e,series:t}){switch(t.tag){case"profit":if(e<=p.targetThreshold.profit)return{color:"FireBrick",hoverStyle:{color:"FireBrick"}};break;case"rr":if(e>p.targetThreshold.rr)return{color:"Aqua",hoverStyle:{color:"Aqua"}};break;case"winrate":if(e>p.targetThreshold.winrate)return{color:"Fuchsia",hoverStyle:{color:"Fuchsia"}};break}}function P({value:e}){return r.shorten(e)}function y(e){let t=e.point.data.accProfit,s=m();if(s!==null){let a=c.value.data.find(_=>_.date===s).accProfit;t=t-a}return{html:`<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${e.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.statistic.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${e.point.data.profit>=0?"green":"red"}'>
                      ${r.shorten(e.point.data.profit,"₫")}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.statistic.rr")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${r.numberVnFormat(e.point.data.rr,e.point.data.rr>2?0:1)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.statistic.winrate")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${r.numberVnFormat(e.point.data.winrate,0)}%
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.statistic.accProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${r.shorten(t,"₫")}
                    </span>
                  </div>
                </div>
              </div>`}}function x({target:e}){let t=m()===e.argument?null:e.argument;h(t)}function T(e){const t=e.target;let s=m();t.isVisible()?(t.hide(),i[t.tag]=!1):(t.show(),i[t.tag]=!0),setTimeout(()=>h(s),0)}function m(){return l.value.instance.option("argumentAxis.constantLines[0].value")}function h(e){return l.value.instance.option("argumentAxis.constantLines[0].value",e)}return(e,t)=>{const s=q("DxToolbar");return u(),d(j,null,[o(C,{hasTitle:!1}),o(A,{hasTitle:!1,onPeriod:w}),g("div",G,[o(s,{items:[{visible:e.$mf.isSet(e.$route.query),location:"before",widget:"dxButton",options:{icon:"far fa-arrow-left small",hint:e.$t("buttons.back"),onClick:()=>e.$router.go(-1)}},{location:"before",cssClass:"page-button",widget:"dxButton",options:{icon:"far fa-backward small",hint:e.$t("trading.statistic.buttons.more"),elementAttr:{"data-page":c.value.page},onClick:()=>e.$store.dispatch("tradingStatistic/lazyLoad")}},{location:"before",widget:"dxButton",options:{icon:"far fa-database small",hint:e.$t("trading.statistic.buttons.addData"),onClick:()=>e.$refs.trackStatisticPopupRef.show()}},{location:"after",widget:"dxSelectBox",options:{width:90,items:e.$mf.getChartPeriodList(),displayExpr:"name",valueExpr:"value",value:c.value.period,dropDownOptions:{wrapperAttr:{class:"statistic-period-select-popup"}},onValueChanged:a=>e.$store.dispatch("tradingStatistic/getProfitChart",a.value)}}]},null,8,["items"]),o(N(S),{ref_key:"chartRef",ref:l,"data-source":c.value.data,"customize-point":$,title:{text:e.$t("trading.statistic.charTitle"),horizontalAlignment:"center"},size:{width:"100%"},zoomAndPan:{argumentAxis:"both"},loadingIndicator:{enabled:!0,show:!0,text:e.$t("titles.loadingText")},export:{enabled:!0,formats:["PNG"],fileName:"chart",printingEnabled:!1},commonSeriesSettings:{argumentField:"date",barPadding:0},series:[{name:e.$t("trading.statistic.profitSum"),tag:"profit",valueField:"profit",axis:"profit",type:"bar",color:"DarkGreen",visible:i.profit},{name:e.$t("trading.statistic.rr"),tag:"rr",valueField:"rr",axis:"rr",type:"bar",color:"Teal",visible:i.rr},{name:e.$t("trading.statistic.winrate"),tag:"winrate",valueField:"winrate",axis:"winrate",type:"bar",color:"Purple",visible:i.winrate},{name:e.$t("trading.statistic.accProfit"),tag:"accProfit",valueField:"accProfit",axis:"accProfit",type:"spline",color:"White",visible:i.accProfit}],valueAxis:[{name:"profit",synchronizedValue:0,label:{customizeText:P},constantLines:[{value:0,color:"White",label:{visible:!1},displayBehindSeries:!0}]},{name:"rr",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"winrate",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"accProfit",label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1}],tooltip:{enabled:!0,shared:!1,customizeTooltip:y},legend:{verticalAlignment:"top",horizontalAlignment:"center",hoverMode:"none",markerTemplate:"markerTemplate"},argumentAxis:{constantLines:[{width:2,color:"white",dashStyle:"dot",value:null}]},onPointClick:x,onLegendClick:T},{markerTemplate:M(({data:a})=>[(u(),d("svg",null,[a.series.tag==="accProfit"?(u(),d("g",W,[g("path",{d:"M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z",fill:a.marker.fill},null,8,O)])):(u(),d("g",U,[g("rect",{x:0,y:0,width:20,height:10,fill:a.marker.fill},null,8,Z)]))]))]),_:1},8,["data-source","title","loadingIndicator","series","valueAxis","tooltip"]),o(z,{ref:"trackStatisticPopupRef"},null,512)])],64)}}};export{ee as default};
