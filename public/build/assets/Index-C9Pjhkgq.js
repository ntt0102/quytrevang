import{D as S}from"./chart-BdNOIjlX.js";import A from"./OpeningSummary-DLbR_1We.js";import z from"./Summary-4jzRO57O.js";import F from"./TrackStatisticPopup-DlI17voy.js";import{u as D,a as _,r as B,c as L,K as V,b as d,e as o,d as h,f as R,g as E,F as q,h as M,j as N,k as b,m as j,o as u}from"./app-k4NLUntP.js";import"./m_base_chart-DIElVUqP.js";const G={class:"trades-page content-block dx-card responsive-paddings"},W={key:0},K=["fill"],O={key:1},U=["fill"],ee={__name:"Index",setup(Z){const f=M(),k=N(),{t:n}=D(),g=b("bus"),r=b("filters");let p={targetThreshold:{profit:0,rr:1,winrate:50}};const s=_({profit:!0,rr:!1,winrate:!1,accProfit:!0}),l=B(null),c=L(()=>f.state.tradingShrstat.charts);f.dispatch("tradingShrstat/getProfitChart",k.query.period??"day"),g.on("toggleMenu",()=>{setTimeout(()=>l.value.instance.render(),300)}),V(()=>g.off("toggleMenu"));function w(e){f.dispatch("tradingShrstat/getProfitChart",e)}function $({value:e,series:t}){switch(t.tag){case"profit":if(e<=p.targetThreshold.profit)return{color:"FireBrick",hoverStyle:{color:"FireBrick"}};break;case"rr":if(e>p.targetThreshold.rr)return{color:"Aqua",hoverStyle:{color:"Aqua"}};break;case"winrate":if(e>p.targetThreshold.winrate)return{color:"Fuchsia",hoverStyle:{color:"Fuchsia"}};break}}function P({value:e}){return r.shorten(e)}function y(e){let t=e.point.data.accProfit,i=m();if(i!==null){let a=c.value.data.find(C=>C.date===i).accProfit;t=t-a}return{html:`<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${e.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.shrstats.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${e.point.data.profit>=0?"green":"red"}'>
                      ${r.shorten(e.point.data.profit,"₫")}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.shrstats.rr")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${r.numberVnFormat(e.point.data.rr,e.point.data.rr>2?0:1)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.shrstats.winrate")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${r.numberVnFormat(e.point.data.winrate,0)}%
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${n("trading.shrstats.accProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${r.shorten(t,"₫")}
                    </span>
                  </div>
                </div>
              </div>`}}function x({target:e}){let t=m()===e.argument?null:e.argument;v(t)}function T(e){const t=e.target;let i=m();t.isVisible()?(t.hide(),s[t.tag]=!1):(t.show(),s[t.tag]=!0),setTimeout(()=>v(i),0)}function m(){return l.value.instance.option("argumentAxis.constantLines[0].value")}function v(e){return l.value.instance.option("argumentAxis.constantLines[0].value",e)}return(e,t)=>{const i=j("DxToolbar");return u(),d(q,null,[o(A,{hasTitle:!1}),o(z,{hasTitle:!1,onPeriod:w}),h("div",G,[o(i,{items:[{visible:e.$mf.isSet(e.$route.query),location:"before",widget:"dxButton",options:{icon:"far fa-arrow-left small",hint:e.$t("buttons.back"),onClick:()=>e.$router.go(-1)}},{location:"before",cssClass:"page-button",widget:"dxButton",options:{icon:"far fa-backward small",hint:e.$t("trading.shrstats.buttons.more"),elementAttr:{"data-page":c.value.page},onClick:()=>e.$store.dispatch("tradingShrstat/lazyLoad")}},{location:"before",widget:"dxButton",options:{icon:"far fa-database small",hint:e.$t("trading.shrstats.buttons.addData"),onClick:()=>e.$refs.trackStatisticPopupRef.show()}},{location:"after",widget:"dxSelectBox",options:{width:90,items:e.$mf.getChartPeriodList(),displayExpr:"name",valueExpr:"value",value:c.value.period,dropDownOptions:{wrapperAttr:{class:"statistic-period-select-popup"}},onValueChanged:a=>e.$store.dispatch("tradingShrstat/getProfitChart",a.value)}}]},null,8,["items"]),o(E(S),{ref_key:"chartRef",ref:l,"data-source":c.value.data,"customize-point":$,title:{text:e.$t("trading.shrstats.charTitle"),horizontalAlignment:"center"},size:{width:"100%"},zoomAndPan:{argumentAxis:"both"},loadingIndicator:{enabled:!0,show:!0,text:e.$t("titles.loadingText")},export:{enabled:!0,formats:["PNG"],fileName:"chart",printingEnabled:!1},commonSeriesSettings:{argumentField:"date",barPadding:0},series:[{name:e.$t("trading.shrstats.profitSum"),tag:"profit",valueField:"profit",axis:"profit",type:"bar",color:"DarkGreen",visible:s.profit},{name:e.$t("trading.shrstats.rr"),tag:"rr",valueField:"rr",axis:"rr",type:"bar",color:"Teal",visible:s.rr},{name:e.$t("trading.shrstats.winrate"),tag:"winrate",valueField:"winrate",axis:"winrate",type:"bar",color:"Purple",visible:s.winrate},{name:e.$t("trading.shrstats.accProfit"),tag:"accProfit",valueField:"accProfit",axis:"accProfit",type:"spline",color:"White",visible:s.accProfit}],valueAxis:[{name:"profit",synchronizedValue:0,label:{customizeText:P},constantLines:[{value:0,color:"White",label:{visible:!1},displayBehindSeries:!0}]},{name:"rr",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"winrate",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"accProfit",label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1}],tooltip:{enabled:!0,shared:!1,customizeTooltip:y},legend:{verticalAlignment:"top",horizontalAlignment:"center",hoverMode:"none",markerTemplate:"markerTemplate"},argumentAxis:{constantLines:[{width:2,color:"white",dashStyle:"dot",value:null}]},onPointClick:x,onLegendClick:T},{markerTemplate:R(({data:a})=>[(u(),d("svg",null,[a.series.tag==="accProfit"?(u(),d("g",W,[h("path",{d:"M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z",fill:a.marker.fill},null,8,K)])):(u(),d("g",O,[h("rect",{x:0,y:0,width:20,height:10,fill:a.marker.fill},null,8,U)]))]))]),_:1},8,["data-source","title","loadingIndicator","series","valueAxis","tooltip"]),o(F,{ref:"trackStatisticPopupRef"},null,512)])],64)}}};export{ee as default};
