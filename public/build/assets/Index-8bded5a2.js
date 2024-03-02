import{_ as S}from"./chart-af772f0c.js";import _ from"./Summary-c578abcc.js";import C from"./TrackStatisticPopup-b1c69954.js";import{u as A,b as z,c as L,i as b,d as B,r as D,e as y,y as V,f as R,g as c,j as m,h as n,k as q,l as M,F as E,o as d}from"./app-ef62a557.js";import"./m_base_chart-2471ce52.js";const N={class:"trades-page content-block dx-card responsive-paddings"},O={key:0},G=["fill"],j={key:1},W=n("rect",{x:0,y:0,width:20,height:2,fill:"DarkOrange"},null,-1),U=n("rect",{x:0,y:2,width:20,height:4,fill:"FireBrick"},null,-1),Z=n("rect",{x:0,y:5,width:20,height:4,fill:"DarkGreen"},null,-1),H=[W,U,Z],J={key:2},K=["fill"],ae={__name:"Index",setup(Q){const f=A(),P=z(),{t:a}=L(),g=b("bus"),i=b("filters");let u={principalTargetThreshold:{day:1,week:5,month:22,quarter:65,year:260},feesTargetThreshold:5};const s=B({money:!0,profitPerPrincipal:!1,profitPerFees:!1,accumulatedProfit:!0}),p=D(null),l=y(()=>f.state.tradingStatistic.charts);y(()=>f.state.auth.user.permissions),f.dispatch("tradingStatistic/getChart",P.query.period??"day"),g.on("toggleMenu",()=>{setTimeout(()=>p.value.instance.render(),300)}),V(()=>g.off("toggleMenu"));function k({value:e,series:t}){return t.tag==="profitPerPrincipal"&&e>=u.principalTargetThreshold[l.value.period]?{color:"Aqua",hoverStyle:{color:"Aqua"}}:t.tag==="profitPerFees"&&e>=u.feesTargetThreshold?{color:"Fuchsia",hoverStyle:{color:"Fuchsia"}}:{color:t.color,hoverStyle:{color:t.color}}}function $({valueText:e}){return`${e.replace(",0","").replace("M"," Tr")}`}function T(e){let t=e.point.data.accumulatedProfit,o=v();if(o!==null){let r=l.value.data.find(w=>w.time===o).accumulatedProfit;t=t-r}return{html:`<div class='trade-chart-tooltip'>
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
              </div>`}}function F({target:e}){let t=v()===e.argument?null:e.argument;h(t)}function x(e){const t=e.target;let o=v();t.isVisible()?(t.hide(),s[t.tag]=!1):(t.show(),s[t.tag]=!0),setTimeout(()=>h(o),0)}function v(){return p.value.instance.option("argumentAxis.constantLines[0].value")}function h(e){return p.value.instance.option("argumentAxis.constantLines[0].value",e)}return(e,t)=>{const o=R("DxToolbar");return d(),c(E,null,[m(_,{hasTitle:!1}),n("div",N,[m(o,{items:[{visible:e.$mf.isSet(e.$route.query),location:"before",widget:"dxButton",options:{icon:"far fa-arrow-left small",hint:e.$t("buttons.back"),onClick:()=>e.$router.go(-1)}},{location:"before",cssClass:"page-button",widget:"dxButton",options:{icon:"far fa-backward small",hint:e.$t("trading.trades.buttons.more"),elementAttr:{"data-page":l.value.page},onClick:()=>e.$store.dispatch("tradingStatistic/lazyLoad")}},{location:"before",widget:"dxButton",options:{icon:"far fa-database small",hint:e.$t("trading.statistic.buttons.addData"),onClick:()=>e.$refs.trackStatisticPopupRef.show()}},{location:"after",widget:"dxSelectBox",options:{width:90,items:e.$mf.getChartPeriodList(),displayExpr:"name",valueExpr:"value",value:l.value.period,dropDownOptions:{wrapperAttr:{class:"statistic-period-select-popup"}},onValueChanged:r=>e.$store.dispatch("tradingStatistic/getChart",r.value)}}]},null,8,["items"]),m(M(S),{ref_key:"chartRef",ref:p,"data-source":l.value.data,"customize-point":k,title:{text:e.$t("trading.trades.charTitle"),horizontalAlignment:"center"},size:{width:"100%"},zoomAndPan:{argumentAxis:"both"},loadingIndicator:{enabled:!0,show:!0,text:e.$t("titles.loadingText")},export:{enabled:!0,formats:["PNG"],fileName:"chart",printingEnabled:!1},commonSeriesSettings:{argumentField:"time",barPadding:0},series:[{name:e.$t("trading.trades.profitSum"),tag:"money",valueField:"s3",axis:"money",type:"stackedbar",stack:"money",color:"DarkGreen",visible:s.money},{name:e.$t("trading.trades.lossSum"),valueField:"s4",axis:"money",type:"stackedbar",stack:"money",color:"FireBrick",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.feesSum"),valueField:"s5",axis:"money",type:"stackedbar",stack:"money",color:"DarkOrange",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.feesSum"),valueField:"s2",axis:"money",type:"stackedbar",stack:"money",color:"DarkOrange",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.lossSum"),valueField:"s1",axis:"money",type:"stackedbar",stack:"money",color:"FireBrick",showInLegend:!1,visible:s.money},{name:e.$t("trading.trades.profitPerPrincipal"),tag:"profitPerPrincipal",valueField:"profitPerPrincipal",axis:"profitPerPrincipal",type:"stackedbar",stack:"profitPerPrincipal",color:"Teal",visible:s.profitPerPrincipal},{name:e.$t("trading.trades.profitPerFees"),tag:"profitPerFees",valueField:"profitPerFees",axis:"profitPerFees",type:"stackedbar",stack:"profitPerFees",color:"Purple",visible:s.profitPerFees},{name:e.$t("trading.trades.accumulatedProfit"),tag:"accumulatedProfit",valueField:"accumulatedProfit",axis:"accumulatedProfit",type:"spline",color:"White",visible:s.accumulatedProfit}],valueAxis:[{name:"money",synchronizedValue:0,label:{customizeText:$},constantLines:[{value:0,color:"White",label:{visible:!1},displayBehindSeries:!0}]},{name:"profitPerPrincipal",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"profitPerFees",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"accumulatedProfit",label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1}],tooltip:{enabled:!0,shared:!1,customizeTooltip:T},legend:{verticalAlignment:"top",horizontalAlignment:"center",hoverMode:"none",markerTemplate:"markerTemplate"},argumentAxis:{constantLines:[{width:2,color:"white",dashStyle:"dot",value:null}]},onPointClick:F,onLegendClick:x},{markerTemplate:q(({data:r})=>[(d(),c("svg",null,[r.series.tag==="accumulatedProfit"?(d(),c("g",O,[n("path",{d:"M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z",fill:r.marker.fill},null,8,G)])):r.series.tag==="money"?(d(),c("g",j,H)):(d(),c("g",J,[n("rect",{x:0,y:0,width:20,height:10,fill:r.marker.fill},null,8,K)]))]))]),_:1},8,["data-source","title","loadingIndicator","series","valueAxis","tooltip"]),m(C,{ref:"trackStatisticPopupRef"},null,512)])],64)}}};export{ae as default};
