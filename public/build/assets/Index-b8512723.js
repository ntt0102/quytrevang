import{_ as w}from"./chart-10c6aade.js";import S from"./TrackStatisticPopup-117defd2.js";import{u as _,b as C,c as A,i as b,d as z,r as L,e as B,z as D,f as V,g as n,j as f,k as R,l as q,o as c,h as d}from"./app-75ec0a12.js";import"./annotations-98daddb4.js";const M={class:"trades-page content-block dx-card responsive-paddings"},E={key:0},N=["fill"],O={key:1},G=d("rect",{x:0,y:0,width:10,height:10,fill:"DarkGreen"},null,-1),j=d("rect",{x:10,y:0,width:7,height:10,fill:"FireBrick"},null,-1),W=d("rect",{x:17,y:0,width:3,height:10,fill:"DarkOrange"},null,-1),U=[G,j,W],Z={key:2},H=["fill"],I={__name:"Index",setup(J){const v=_(),y=C(),{t:a}=A(),g=b("bus"),i=b("filters");let u={principalTargetThreshold:{day:1,week:5,month:22,quarter:65,year:260},feesTargetThreshold:5};const s=z({money:!0,profitPerPrincipal:!1,profitPerFees:!1,accumulatedProfit:!0}),p=L(null),l=B(()=>v.state.tradingStatistic.charts);v.dispatch("tradingStatistic/getChart",y.query.period??"day"),g.on("toggleMenu",()=>{setTimeout(()=>p.value.instance.render(),300)}),D(()=>g.off("toggleMenu"));function P({value:e,series:t}){return t.tag==="profitPerPrincipal"&&e>=u.principalTargetThreshold[l.value.period]?{color:"Aqua",hoverStyle:{color:"Aqua"}}:t.tag==="profitPerFees"&&e>=u.feesTargetThreshold?{color:"Fuchsia",hoverStyle:{color:"Fuchsia"}}:{color:t.color,hoverStyle:{color:t.color}}}function k({valueText:e}){return`${e.replace(",0","").replace("M"," Tr")}`}function $(e){let t=e.point.data.accumulatedProfit,o=m();if(o!==null){let r=l.value.data.find(F=>F.time===o).accumulatedProfit;t=t-r}return{html:`<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${e.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.principalAvg")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${i.currency(e.point.data.principal)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.revenueSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${i.currency(e.point.data.revenue)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.lossSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${i.currency(e.point.data.loss)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.feesSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${i.currency(e.point.data.fees)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${e.point.data.profit>=0?"green":"red"}'>
                      ${i.currency(e.point.data.profit)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='top-series-name'>
                      ${a("trading.trades.profitPerPrincipal")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='top-series-value'>
                      ${i.numberVnFormat(e.point.data.profitPerPrincipal,1)}%
                      (${(100*e.point.data.profitPerPrincipal/u.principalTargetThreshold[l.value.period]).toFixed(0)}%
                      ${a("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.profitPerFees")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${i.numberVnFormat(e.point.data.profitPerFees,1)}
                      (${(100*e.point.data.profitPerFees/u.feesTargetThreshold).toFixed(0)}%
                      ${a("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.accumulatedProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${i.currency(t)}
                    </span>
                  </div>
                </div>
              </div>`}}function T({target:e}){let t=m()===e.argument?null:e.argument;h(t)}function x(e){const t=e.target;let o=m();t.isVisible()?(t.hide(),s[t.tag]=!1):(t.show(),s[t.tag]=!0),setTimeout(()=>h(o),0)}function m(){return p.value.instance.option("argumentAxis.constantLines[0].value")}function h(e){return p.value.instance.option("argumentAxis.constantLines[0].value",e)}return(e,t)=>{const o=V("DxToolbar");return c(),n("div",M,[f(o,{items:[{visible:e.$mf.isSet(e.$route.query),location:"before",widget:"dxButton",options:{icon:"far fa-arrow-left small",hint:e.$t("buttons.back"),onClick:()=>e.$router.go(-1)}},{location:"before",cssClass:"page-button",widget:"dxButton",options:{icon:"far fa-backward small",hint:e.$t("trading.trades.buttons.more"),elementAttr:{"data-page":l.value.page},onClick:()=>e.$store.dispatch("tradingStatistic/lazyLoad")}},{location:"before",widget:"dxButton",options:{icon:"far fa-database small",hint:e.$t("trading.trades.buttons.addData"),onClick:()=>e.$refs.trackStatisticPopupRef.show()}},{location:"after",widget:"dxSelectBox",options:{width:90,items:e.$mf.getChartPeriodList(),displayExpr:"name",valueExpr:"value",value:l.value.period,dropDownOptions:{wrapperAttr:{class:"statistic-period-select-popup"}},onValueChanged:r=>e.$store.dispatch("tradingStatistic/getChart",r.value)}}]},null,8,["items"]),f(q(w),{ref_key:"chartRef",ref:p,"data-source":l.value.data,"customize-point":P,title:{text:e.$t("trading.trades.charTitle"),horizontalAlignment:"center"},size:{width:"100%"},zoomAndPan:{argumentAxis:"both"},loadingIndicator:{enabled:!0,show:!0,text:e.$t("titles.loadingText")},export:{enabled:!0,formats:["PNG"],fileName:"chart",printingEnabled:!1},commonSeriesSettings:{argumentField:"time",barPadding:0},series:[{name:e.$t("trading.trades.profitSum"),tag:"money",valueField:"s3",axis:"money",type:"stackedbar",stack:"money",color:"DarkGreen",visible:s.money},{name:e.$t("trading.trades.lossSum"),valueField:"s4",axis:"money",type:"stackedbar",stack:"money",color:"FireBrick",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.feesSum"),valueField:"s5",axis:"money",type:"stackedbar",stack:"money",color:"DarkOrange",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.feesSum"),valueField:"s2",axis:"money",type:"stackedbar",stack:"money",color:"DarkOrange",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.lossSum"),valueField:"s1",axis:"money",type:"stackedbar",stack:"money",color:"FireBrick",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.profitPerPrincipal"),tag:"profitPerPrincipal",valueField:"profitPerPrincipal",axis:"profitPerPrincipal",type:"stackedbar",stack:"profitPerPrincipal",color:"Teal",visible:s.profitPerPrincipal},{name:e.$t("trading.trades.profitPerFees"),tag:"profitPerFees",valueField:"profitPerFees",axis:"profitPerFees",type:"stackedbar",stack:"profitPerFees",color:"Purple",visible:s.profitPerFees},{name:e.$t("trading.trades.accumulatedProfit"),tag:"accumulatedProfit",valueField:"accumulatedProfit",axis:"accumulatedProfit",type:"spline",color:"White",visible:s.accumulatedProfit}],valueAxis:[{name:"money",synchronizedValue:0,label:{customizeText:k},constantLines:[{value:0,color:"White",label:{visible:!1},displayBehindSeries:!0}]},{name:"profitPerPrincipal",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"profitPerFees",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"accumulatedProfit",label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1}],tooltip:{enabled:!0,shared:!1,customizeTooltip:$},legend:{verticalAlignment:"top",horizontalAlignment:"center",hoverMode:"none",markerTemplate:"markerTemplate"},argumentAxis:{constantLines:[{width:2,color:"white",dashStyle:"dot",value:null}]},onPointClick:T,onLegendClick:x},{markerTemplate:R(({data:r})=>[(c(),n("svg",null,[r.series.tag==="accumulatedProfit"?(c(),n("g",E,[d("path",{d:"M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z",fill:r.marker.fill},null,8,N)])):r.series.tag==="money"?(c(),n("g",O,U)):(c(),n("g",Z,[d("rect",{x:0,y:0,width:20,height:10,fill:r.marker.fill},null,8,H)]))]))]),_:1},8,["data-source","title","loadingIndicator","series","valueAxis","tooltip"]),f(S,{ref:"trackStatisticPopupRef"},null,512)])}}};export{I as default};
